import ExpenseList from "@/components/Expense/ExpenseList";
import PageLoader from "@/components/PageLoader";
import useLocalStorage from "@/hooks/useLocalStorage";
import { JarCategory } from "@/pages/Expenses";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
const AllExpenses = () => {
  const [loading, setLoading] = useState(false);
  const [categories] = useLocalStorage<JarCategory[]>("jar-categories", []);

  return (
    <div className="container pt-4 pb-20">
      <Link
        to="/expenses"
        className="text-sm text-muted-foreground flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại</span>
      </Link>
      {loading ? (
        <div className="mt-6">
          <PageLoader />
        </div>
      ) : (
        <ExpenseList categories={categories} />
      )}
    </div>
  );
};

export default AllExpenses;
