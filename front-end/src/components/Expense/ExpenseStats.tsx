import ExpenseForCategory from "@/components/Expense/ExpenseForCategory";
import MonthExpenseTable from "@/components/Expense/MonthExpenseTable";
import PageLoader from "@/components/PageLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { EXPENSE_CATEGORIES_COLORS_CHART } from "@/constants/expense";
import expenseService from "@/services/expense.service";
import { ExpenseCategory } from "@/types/Expense.type";
import { useEffect, useState } from "react";

const months = [
  { value: "1", label: "Tháng 1" },
  { value: "2", label: "Tháng 2" },
  { value: "3", label: "Tháng 3" },
  { value: "4", label: "Tháng 4" },
  { value: "5", label: "Tháng 5" },
  { value: "6", label: "Tháng 6" },
  { value: "7", label: "Tháng 7" },
  { value: "8", label: "Tháng 8" },
  { value: "9", label: "Tháng 9" },
  { value: "10", label: "Tháng 10" },
  { value: "11", label: "Tháng 11" },
  { value: "12", label: "Tháng 12" },
];

const years = [2025, 2026, 2027, 2028, 2029, 2030];

interface ExpenseStatsProps {
  categories: ExpenseCategory[];
}

const ExpenseStats = ({ categories }: ExpenseStatsProps) => {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(
    currentDate.getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState(
    (currentDate.getMonth() + 1).toString()
  );
  const [dataByCategory, setDataByCategory] = useState<
    {
      name: string;
      value: number;
      color: string;
      maxAmount: number;
      categoryId: number;
    }[]
  >([]);
  const [dataByDate, setDataByDate] = useState<
    {
      date: string;
      amount: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (month: string, year: string) => {
    setLoading(true);
    const response = await expenseService.getExpenseStatistics(
      Number(month),
      Number(year)
    );
    setDataByCategory(
      response.dataByCategory.map((item) => ({
        name: item.category.name,
        value: item.amount,
        maxAmount: item.category.maximumAmount,
        color: mappingCategoryColor(item.category.code),
        categoryId: item.category.id,
      }))
    );
    setDataByDate(response.dataByDate);
    setLoading(false);
  };

  const renderExpenseForCategory = () => {
    const hasData = dataByCategory.filter((item) => item.value > 0).length > 0;
    if (!hasData) {
      return (
        <div className="text-center text-sm text-muted-foreground">
          Không có dữ liệu
        </div>
      );
    }

    return <ExpenseForCategory data={dataByCategory} />;
  };

  useEffect(() => {
    fetchData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Thống kê chi tiêu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 pb-4">
            <div className="w-full sm:w-auto">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.length > 0 ? (
                    years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value={currentDate.getFullYear().toString()}>
                      {currentDate.getFullYear()}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-auto">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Phân bổ chi tiêu</CardTitle>
              </CardHeader>
              <CardContent>{renderExpenseForCategory()}</CardContent>
            </Card>

            <div className="space-y-4">
              {dataByCategory?.map((category) => {
                const amount = category.value || 0;
                const percentage =
                  category.maxAmount > 0
                    ? (amount / category.maxAmount) * 100
                    : 0;

                return (
                  <div key={category.categoryId} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                      <span className="text-sm font-medium">
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(amount)}
                      </span>
                    </div>
                    <Progress
                      value={percentage}
                      className={`h-2 ${category.color}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <Separator className="my-4" />
          <MonthExpenseTable data={dataByDate} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseStats;

function mappingCategoryColor(code: string) {
  return EXPENSE_CATEGORIES_COLORS_CHART[code] || "gray";
}
