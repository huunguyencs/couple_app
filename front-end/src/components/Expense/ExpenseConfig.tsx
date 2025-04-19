import {
  getCategoryIcon,
  mappingCategoryIcon,
} from "@/components/Expense/CategoryIcon";
import ExpenseCategoryConfig from "@/components/Expense/ExpenseCategoryConfig";
import PageLoader from "@/components/PageLoader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ExpenseCategory } from "@/types/Expense.type";
import { Save } from "lucide-react";

interface ExpenseConfigProps {
  categories: ExpenseCategory[];
  updateConfig: (categoryId: number, maxAmount: number) => void;
  isLoading: boolean;
  getCategoryBalance: (categoryId: number) => number;
}

const ExpenseConfig = ({
  categories,
  updateConfig,
  isLoading,
  getCategoryBalance,
}: ExpenseConfigProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            <span>Giới hạn khoản chi</span>
          </CardTitle>
          <CardDescription>
            Đặt số tiền tối đa cho mỗi mục chi tiêu
          </CardDescription>
        </CardHeader>
      </Card>

      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          {categories.map((category) => {
            const balance = getCategoryBalance(category.id);
            const { icon, color } = mappingCategoryIcon(category.code);
            const maxAmount = category.maximumAmount;
            const percentage =
              maxAmount > 0 ? ((maxAmount - balance) / maxAmount) * 100 : 0;

            return (
              <Card key={category.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${color} bg-opacity-25`}
                      >
                        {getCategoryIcon(icon)}
                      </div>
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Tháng này còn lại
                      </p>
                      <p className="font-semibold">
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(balance)}
                      </p>
                    </div>
                  </div>

                  <Progress value={percentage} className="h-2 mb-4" />

                  <ExpenseCategoryConfig
                    categoryId={category.id}
                    defaultMaximum={category.maximumAmount}
                    onSubmit={updateConfig}
                    isLoading={isLoading}
                  />
                </CardContent>
              </Card>
            );
          })}
        </>
      )}
    </div>
  );
};

export default ExpenseConfig;
