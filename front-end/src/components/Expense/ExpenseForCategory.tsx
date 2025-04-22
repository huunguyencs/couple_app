import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface ExpenseForCategoryProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const ExpenseForCategory = ({ data }: ExpenseForCategoryProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={80}
          paddingAngle={1}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) =>
            Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(value)
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseForCategory;
