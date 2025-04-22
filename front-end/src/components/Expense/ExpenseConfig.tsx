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
import { ExpenseCategory } from "@/types/Expense.type";
import { Save } from "lucide-react";

interface ExpenseConfigProps {
  categories: ExpenseCategory[];
  updateConfig: (categoryId: number, maxAmount: number) => void;
  isLoading: boolean;
  isSubmitting: boolean;
}

const ExpenseConfig = ({
  categories,
  updateConfig,
  isLoading,
  isSubmitting,
}: ExpenseConfigProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            <span>Cài đặt khoản chi</span>
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
            const { icon, color } = mappingCategoryIcon(category.code);

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
                  </div>

                  <ExpenseCategoryConfig
                    categoryId={category.id}
                    defaultMaximum={category.maximumAmount}
                    onSubmit={updateConfig}
                    isSubmitting={isSubmitting}
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
