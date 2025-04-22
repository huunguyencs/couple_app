import instance from "@/services/axios";
import {
  Expense,
  ExpenseCategory,
  ExpenseFilter,
  ExpenseMonthly,
  ExpenseStatistics,
} from "@/types/Expense.type";

const expenseService = {
  getCategories: async () => {
    const response = await instance.get<ExpenseCategory[]>(
      "/expense/categories"
    );
    return response.data;
  },
  updateCategory: async (id: number, category: { maximumAmount: number }) => {
    const response = await instance.put<ExpenseCategory>(
      `/expense/category/${id}`,
      category
    );
    return response.data;
  },
  getMonthlyExpenses: async (month?: number, year?: number) => {
    const response = await instance.get<ExpenseMonthly[]>(
      `/expense/monthly?${month ? `month=${month}` : ""}&${
        year ? `year=${year}` : ""
      }`
    );
    return response.data;
  },
  getExpenses: async (filter?: ExpenseFilter) => {
    const parseFilter = {
      from: filter?.from,
      to: filter?.to,
      categoryId: filter?.categoryId?.toString(),
      offset: filter?.offset?.toString(),
      limit: filter?.limit?.toString(),
      order: filter?.order,
    };

    Object.keys(parseFilter).forEach((key) => {
      if (parseFilter[key] === undefined) {
        delete parseFilter[key];
      }
    });
    const params = new URLSearchParams(parseFilter);
    const response = await instance.get<Expense[]>(
      `/expense/all?${params.toString()}`
    );
    return response.data;
  },
  createExpense: async (expense: {
    amount: number;
    categoryId: number;
    description: string;
    date: string;
  }) => {
    const response = await instance.post<Expense>("/expense", expense);
    return response.data;
  },
  updateExpense: async (id: string, expense: Expense) => {
    const response = await instance.put<Expense>(`/expense/${id}`, expense);
    return response.data;
  },
  deleteExpense: async (id: string) => {
    await instance.delete(`/expense/${id}`);
  },
  getExpenseStatistics: async (month?: number, year?: number) => {
    const response = await instance.get<ExpenseStatistics>(
      `/expense/statistics?${month ? `month=${month}` : ""}&${
        year ? `year=${year}` : ""
      }`
    );
    return response.data;
  },
};

export default expenseService;
