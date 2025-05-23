import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MonthYearReqDto } from 'src/expense/dto/month-year-req.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpensesReqDto } from './dto/get-expenses-req.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { ExpenseService } from './expense.service';

@Controller('expense')
@ApiTags('Expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get('/all')
  async findAll(@Query() query: GetExpensesReqDto) {
    return this.expenseService.findAll(query);
  }

  @Post()
  async create(@Body() body: CreateExpenseDto) {
    return this.expenseService.createExpense(body);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateExpenseDto,
  ) {
    return this.expenseService.updateExpense(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.deleteExpense(id);
  }

  @Get('monthly')
  async getExpenseMonthly(@Query() query: MonthYearReqDto) {
    return this.expenseService.getExpenseMonthly(query.month, query.year);
  }

  @Get('monthly/detail')
  async getMonthlyExpenseDetail(@Query() query: MonthYearReqDto) {
    return this.expenseService.getMonthlyExpenseDetail(query.month, query.year);
  }

  @Get('categories')
  async getCategoryExpense() {
    return this.expenseService.getCategoryExpense();
  }

  @Put('category/:id')
  async updateCategoryExpense(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateExpenseCategoryDto,
  ) {
    return this.expenseService.updateCategoryExpense(id, body);
  }

  @Get('statistics')
  async getExpenseStatistics(@Query() query: MonthYearReqDto) {
    return this.expenseService.getExpenseStatistics(query.month, query.year);
  }
}
