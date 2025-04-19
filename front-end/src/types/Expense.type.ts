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
  id: number;
  amount: number;
  time: string;
  categoryId: number;
}

export interface Expense {
  id: number;
  date: string;
  amount: number;
  monthlyId: number;
  category: ExpenseCategory;
  description: string;
}
