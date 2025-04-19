import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputNumber } from "@/components/ui/input-number";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXPENSE_CATEGORIES_MAPPING } from "@/constants/expense";
import { useToast } from "@/hooks/use-toast";
import { ExpenseCategory } from "@/types/Expense.type";
import { format } from "date-fns";
import { CalendarIcon, ChevronRight, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
interface ExpenseFormProps {
  categories: ExpenseCategory[];
  onSubmit: (expense: {
    amount: number;
    categoryId: number;
    description: string;
    date: Date;
  }) => void;
  isLoading: boolean;
  getCategoryBalance: (categoryId: number) => number;
}

const ExpenseForm = ({
  categories,
  onSubmit,
  isLoading,
  getCategoryBalance,
}: ExpenseFormProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>();
  const [description, setDescription] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [date, setDate] = useState<Date>();
  useEffect(() => {
    if (categoryId) {
      setBalance(getCategoryBalance(categoryId));
    }
  }, [categoryId, getCategoryBalance]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      amount,
      categoryId,
      description: description.trim(),
      date,
    });

    // Reset form
    setAmount(0);
    setDescription("");
    setCategoryId(undefined);
    setDate(undefined);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          <span>Khoản chi mới</span>
        </CardTitle>
        <CardDescription>Thêm một khoản chi mới</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Mục</Label>
            <Select
              value={categoryId?.toString()}
              onValueChange={(value) => setCategoryId(Number(value))}
              disabled={isLoading}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Chọn một mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          EXPENSE_CATEGORIES_MAPPING[cat.code]?.color
                        }`}
                      ></div>
                      <span>{cat.name}</span>
                      <span className="text-sm ml-auto">
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(getCategoryBalance(cat.id))}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Số tiền (VNĐ)</Label>
            <InputNumber
              id="amount"
              value={amount}
              onChange={(value) => setAmount(value)}
              placeholder="Nhập số tiền"
              className="w-full"
              disabled={isLoading || !categoryId}
            />
            {categoryId && (
              <div className="text-sm text-muted-foreground">
                Còn lại:{" "}
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(balance)}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Ngày</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  disabled={isLoading}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mục đích</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mục đích của khoản chi"
              className="w-full"
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={
              isLoading ||
              !categoryId ||
              !amount ||
              amount <= 0 ||
              amount > balance ||
              !date
            }
            isLoading={isLoading}
          >
            Thêm khoản chi <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ExpenseForm;
