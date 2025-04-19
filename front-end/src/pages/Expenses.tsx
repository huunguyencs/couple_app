import ExpenseConfig from "@/components/Expense/ExpenseConfig";
import ExpenseForm from "@/components/Expense/ExpenseForm";
import ExpenseList from "@/components/Expense/ExpenseList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import useMutate from "@/hooks/use-mutate";
import expenseService from "@/services/expense.service";
import { ExpenseCategory, ExpenseMonthly } from "@/types/Expense.type";
import { useEffect, useState } from "react";

const Expenses = () => {
  const now = new Date();
  const { toast } = useToast();

  const {
    data: categories,
    fetching: fetchingCategories,
    submitting: submittingCategories,
    fetchData: fetchCategories,
    updateData: updateCategory,
  } = useMutate<ExpenseCategory>({
    getService: expenseService.getCategories,
    putService: expenseService.updateCategory,
  });

  const {
    data: monthlyExpenses,
    fetching: fetchingMonthly,
    fetchData: fetchMonthlyExpense,
  } = useMutate<ExpenseMonthly>({
    getService: expenseService.getMonthlyExpenses,
  });

  const getCategoryBalance = (categoryId: number) => {
    const categoryExpenses = monthlyExpenses?.filter(
      (expense) => expense.categoryId === categoryId
    );
    const totalSpent = categoryExpenses?.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    return totalSpent || 0;
  };

  const [activeTab, setActiveTab] = useState("expenses");
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0);

  const handleAddExpense = async (expense: {
    amount: number;
    categoryId: number;
    description: string;
    date: Date;
  }) => {
    setLoading(true);
    try {
      await expenseService.createExpense({
        amount: expense.amount,
        categoryId: Number(expense.categoryId),
        description: expense.description,
        date: expense.date.toISOString(),
        monthlyId: monthlyExpenses?.[0]?.id,
      });
      setKey((prev) => prev + 1);

      toast({
        title: "Thành công",
        description: "Thêm khoản chi thành công",
      });
      fetchCategories();
      fetchMonthlyExpense();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Lỗi khi thêm khoản chi",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryConfig = async (
    categoryId: number,
    maxAmount: number
  ) => {
    await updateCategory(categoryId, {
      maximumAmount: maxAmount,
    });
    fetchCategories();
    fetchMonthlyExpense();
  };

  useEffect(() => {
    fetchCategories();
    fetchMonthlyExpense();
  }, []);

  return (
    <div className="container pt-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">
        Quản lý chi tiêu{" "}
        {now.toLocaleString("vi-VN", { month: "short", year: "numeric" })}
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="expenses">Khoản chi</TabsTrigger>
          <TabsTrigger value="settings">Số tiền</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses">
          <ExpenseForm
            categories={categories}
            onSubmit={handleAddExpense}
            isLoading={loading}
            getCategoryBalance={getCategoryBalance}
          />

          <ExpenseList isDefault categories={categories} key={key} />
        </TabsContent>

        <TabsContent value="settings">
          <ExpenseConfig
            categories={categories}
            updateConfig={updateCategoryConfig}
            isLoading={fetchingCategories || submittingCategories}
            getCategoryBalance={getCategoryBalance}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Expenses;
