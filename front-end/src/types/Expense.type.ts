export interface ExpenseFilter {
  from?: string;
  to?: string;
  categoryId?: number;
  offset?: number;
  limit?: number;
  order?: string;
}

export interface ExpenseCategory {
  id: number;
  name: string;
  code: string;
  maximumAmount: number;
}

export interface ExpenseMonthly {
  amount: number;
  categoryId: number;
}

export interface Expense {
  id: number;
  date: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
}

export interface StatisticsByDate {
  date: string;
  amount: number;
}

export interface StatisticsByCategory {
  category: ExpenseCategory;
  amount: number;
}

export interface ExpenseStatistics {
  dataByCategory: StatisticsByCategory[];
  dataByDate: StatisticsByDate[];
}
