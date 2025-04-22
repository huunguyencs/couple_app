import { Inject, Injectable } from '@nestjs/common';
import { and, asc, desc, eq, sql, sum } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB_PROVIDER } from 'src/config/database.config';
import { CreateExpenseDto } from 'src/expense/dto/create-expense.dto';
import { GetExpensesReqDto } from 'src/expense/dto/get-expenses-req.dto';
import { UpdateExpenseCategoryDto } from 'src/expense/dto/update-expense-category.dto';
import * as schema from '../schema';

const expenses = schema.expenses;
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
    };

    const result = await this.db.insert(expenses).values(values).returning();

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

  async getExpenseMonthly(month?: number, year?: number) {
    if (!month) {
      month = new Date().getMonth() + 1;
    }
    if (!year) {
      year = new Date().getFullYear();
    }
    const result = await this.db
      .select({
        amount: sum(expenses.amount),
        categoryId: expenses.categoryId,
      })
      .from(expenses)
      .where(
        sql`EXTRACT(MONTH FROM ${expenses.date}) = ${month} AND EXTRACT(YEAR FROM ${expenses.date}) = ${year}`,
      )
      .groupBy(expenses.categoryId);

    return result;
  }

  async getMonthlyExpenseDetail(month?: number, year?: number) {
    if (!month) {
      month = new Date().getMonth() + 1;
    }
    if (!year) {
      year = new Date().getFullYear();
    }
    const result = await this.db
      .select()
      .from(expenses)
      .where(
        sql`EXTRACT(MONTH FROM ${expenses.date}) = ${month} AND EXTRACT(YEAR FROM ${expenses.date}) = ${year}`,
      );

    return result;
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

  async getExpenseStatistics(month?: number, year?: number) {
    if (!month) {
      month = new Date().getMonth() + 1;
    }
    if (!year) {
      year = new Date().getFullYear();
    }

    const expensesInMonth = await this.db
      .select()
      .from(expenses)
      .where(
        sql`EXTRACT(MONTH FROM ${expenses.date}) = ${month} AND EXTRACT(YEAR FROM ${expenses.date}) = ${year}`,
      );

    const categories = await this.getCategoryExpense();

    const dataByCategoryMap = categories.reduce((acc, category) => {
      if (!acc[category.id]) {
        acc[category.id] = 0;
      }
      acc[category.id] += expensesInMonth.find(
        (expense) => expense.categoryId === category.id,
      )?.amount;
      return acc;
    }, {});

    const dataByCategory = Object.entries(dataByCategoryMap).map(
      ([categoryId, amount]) => ({
        category: categories.find(
          (category) => category.id === Number(categoryId),
        ),
        amount,
      }),
    );

    const dataByDateMap = expensesInMonth.reduce((acc, expense) => {
      const date = expense.date.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += expense.amount;
      return acc;
    }, {});

    const dataByDate = Object.entries(dataByDateMap).map(([date, amount]) => ({
      date,
      amount,
    }));

    const { startDateOfMonth, endDateOfMonth } = this.getStartAndEndDateOfMonth(
      month,
      year,
    );

    const datesInRange = this.getDatesInRange(startDateOfMonth, endDateOfMonth);

    const dataByDateInRange = datesInRange.map((date) => ({
      date,
      amount: dataByDate.find((item) => item.date === date)?.amount || 0,
    }));

    return {
      dataByCategory,
      dataByDate: dataByDateInRange,
    };
  }

  private getStartAndEndDateOfMonth(month: number, year: number) {
    const startDateOfMonth = new Date(year, month - 1, 1);
    let endDateOfMonth = new Date(year, month, 0);
    if (endDateOfMonth > new Date()) {
      endDateOfMonth = new Date();
    }
    return {
      startDateOfMonth,
      endDateOfMonth,
    };
  }

  private formatDate(date: Date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  private getDatesInRange(startDate: Date, endDate: Date) {
    const dates = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(this.formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
}
