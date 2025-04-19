import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { and, asc, desc, eq, sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB_PROVIDER } from 'src/config/database.config';
import { CreateExpenseDto } from 'src/expense/dto/create-expense.dto';
import { GetExpensesReqDto } from 'src/expense/dto/get-expenses-req.dto';
import { UpdateExpenseCategoryDto } from 'src/expense/dto/update-expense-category.dto';
import * as schema from '../schema';

const expenses = schema.expenses;
const expensesMonthly = schema.expenseMonthly;
const expenseCategories = schema.expenseCategories;

const mappingField = {
  date: expenses.date,
  createdAt: expenses.createdAt,
  amount: expenses.amount,
};

@Injectable()
export class ExpenseService {
  constructor(
    @Inject(DB_PROVIDER)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll(query: GetExpensesReqDto) {
    const { from, to, categoryId, offset, limit, order } = query;

    const where = [];

    if (from) {
      where.push(eq(expenses.date, new Date(from)));
    }

    if (to) {
      where.push(eq(expenses.date, new Date(to)));
    }

    if (categoryId) {
      where.push(eq(expenses.categoryId, categoryId));
    }

    const orderBy = [desc(expenses.createdAt)];

    if (order) {
      const [field, direction] = order.split(':');
      const column = mappingField[field];
      orderBy.push(direction === 'asc' ? asc(column) : desc(column));
    }

    const results = await this.db
      .select()
      .from(expenses)
      .innerJoin(
        expenseCategories,
        eq(expenses.categoryId, expenseCategories.id),
      )
      .where(and(...where))
      .limit(limit)
      .offset(offset)
      .orderBy(...orderBy);

    return results.map((result) => ({
      ...result.expenses,
      expense_categories: undefined,
      category: result.expense_categories,
    }));
  }

  async createExpense(body: CreateExpenseDto) {
    const values = {
      amount: body.amount,
      date: new Date(body.date),
      description: body.description,
      categoryId: body.categoryId,
      monthlyId: body.monthlyId,
    };

    const result = await this.db.insert(expenses).values(values).returning();

    await this.db
      .update(expensesMonthly)
      .set({
        amount: sql`${expensesMonthly.amount} - ${body.amount}`,
      })
      .where(eq(expensesMonthly.id, body.monthlyId));

    return result[0];
  }

  async updateExpense(id: number, body: CreateExpenseDto) {
    const values = {
      amount: body.amount,
      date: new Date(body.date),
      description: body.description,
    };

    const result = await this.db
      .update(expenses)
      .set(values)
      .where(eq(expenses.id, id))
      .returning();

    return result[0];
  }

  async deleteExpense(id: number) {
    const result = await this.db
      .delete(expenses)
      .where(eq(expenses.id, id))
      .returning();

    return result[0];
  }

  async getExpenseMonthly(month?: string) {
    if (!month) {
      month = this.getCurrentMonthString();
    }
    const result = await this.db
      .select()
      .from(expensesMonthly)
      .where(eq(expensesMonthly.time, month));

    return result;
  }

  async getMonthlyExpenseDetail(month: string) {
    const result = await this.db
      .select()
      .from(expensesMonthly)
      .leftJoin(expenses, eq(expenses.monthlyId, expensesMonthly.id))
      .where(eq(expenses.date, new Date(month)));

    return result;
  }

  async createCurrentMonthlyExpense() {
    const currentMonthString = this.getCurrentMonthString();

    const existed = await this.db
      .select()
      .from(expensesMonthly)
      .where(eq(expensesMonthly.time, currentMonthString));

    if (existed.length > 0) {
      throw new ConflictException('Monthly expense already exists');
    }

    const categories = await this.getCategoryExpense();

    const dataToInsert = categories.map((category) => ({
      amount: 0,
      time: currentMonthString,
      categoryId: category.id,
    }));

    const result = await this.db
      .insert(expensesMonthly)
      .values(dataToInsert)
      .returning();

    return result[0];
  }

  async getCategoryExpense() {
    const result = await this.db
      .select()
      .from(expenseCategories)
      .orderBy(asc(expenseCategories.id));

    return result;
  }

  async updateCategoryExpense(id: number, body: UpdateExpenseCategoryDto) {
    const result = await this.db
      .update(expenseCategories)
      .set({ maximumAmount: body.maximumAmount })
      .where(eq(expenseCategories.id, id))
      .returning();

    return result[0];
  }

  private getCurrentMonthString() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const currentMonthString = `${currentYear}-${currentMonth}`;

    return currentMonthString;
  }
}
