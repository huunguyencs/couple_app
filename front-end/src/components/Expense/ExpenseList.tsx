import DateRangeFilter from "@/components/DateRangeFilter";
import {
  getCategoryIcon,
  mappingCategoryIcon,
} from "@/components/Expense/CategoryIcon";
import PageLoader from "@/components/PageLoader";
import { Card, CardContent } from "@/components/ui/card";
import useMutate from "@/hooks/use-mutate";
import expenseService from "@/services/expense.service";
import { Expense, ExpenseCategory, ExpenseFilter } from "@/types/Expense.type";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface ExpenseListProps {
  categories: ExpenseCategory[];
  isDefault?: boolean;
  key: number;
}

const ExpenseList = ({ categories, isDefault, key }: ExpenseListProps) => {
  const getService = (query?: ExpenseFilter) => {
    if (isDefault) {
      return expenseService.getExpenses({
        limit: 10,
        offset: 0,
        order: "createdAt:desc",
      });
    }

    return expenseService.getExpenses(query);
  };
  const {
    data: expenses,
    fetching: fetchingExpenses,
    fetchData: fetchExpenses,
  } = useMutate<Expense>({
    getService,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (fetchingExpenses) {
    return <PageLoader />;
  }

  if (expenses.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">
            Chưa có khoản chi nào. Thêm khoản chi trên đây.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {isDefault ? (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Khoản chi gần đây</h2>
          <Link to="/expenses/all" className="text-sm text-muted-foreground">
            Xem tất cả
          </Link>
        </div>
      ) : (
        <h2 className="text-lg font-medium">Tất cả khoản chi</h2>
      )}
      {!isDefault && <DateRangeFilter onDateRangeChange={() => {}} />}

      <div className="space-y-3">
        {expenses.map((expense) => {
          const category = categories.find(
            (cat) => cat.id === expense.category.id
          );

          const { icon, color } = mappingCategoryIcon(expense.category.code);

          return (
            <Card key={expense.id} className="overflow-hidden">
              <div className={`h-1 ${color || "bg-gray-300"}`}></div>
              <CardContent className="pt-4 pb-3 px-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-md ${color} bg-opacity-20`}>
                      {getCategoryIcon(icon)}
                    </div>
                    <div>
                      <p className="font-medium">
                        {category?.name || expense.category.name}
                      </p>
                      {expense.description && (
                        <p className="text-sm text-muted-foreground">
                          {expense.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      -
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(expense.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(expense.date)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseList;
