import { Button } from "@/components/ui/button";
import { InputNumber } from "@/components/ui/input-number";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ExpenseCategoryConfigProps {
  categoryId: number;
  defaultMaximum: number;
  onSubmit: (categoryId: number, maximumAmount: number) => void;
  isSubmitting: boolean;
}

const ExpenseCategoryConfig = ({
  categoryId,
  defaultMaximum,
  onSubmit,
  isSubmitting,
}: ExpenseCategoryConfigProps) => {
  const [maximumAmount, setMaximumAmount] = useState(defaultMaximum);

  const handleSubmit = () => {
    onSubmit(categoryId, maximumAmount);
  };

  return (
    <div className="flex gap-3">
      <div className="flex-grow">
        <Label>Số tiền tối đa/tháng</Label>
        <InputNumber
          value={maximumAmount}
          onChange={(value) => setMaximumAmount(value)}
          placeholder="Nhập số tiền tối đa"
        />
      </div>
      <div className="self-end">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !maximumAmount || maximumAmount <= 0}
          isLoading={isSubmitting}
        >
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default ExpenseCategoryConfig;
