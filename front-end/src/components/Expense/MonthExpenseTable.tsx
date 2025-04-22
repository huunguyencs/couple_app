import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";

interface MonthExpenseTableProps {
  data: {
    date: string;
    amount: number;
  }[];
}

const ITEMS_PER_PAGE = 10;

const MonthExpenseTable = ({ data }: MonthExpenseTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedExpenses = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage]);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  if (data.filter((expenseDate) => expenseDate.amount > 0).length === 0) {
    return (
      <div className="text-center">
        <span>Không có dữ liệu</span>
      </div>
    );
  }

  return (
    <div className="rounded-md border py-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedExpenses.map((expenseDate) => (
            <TableRow key={expenseDate.date}>
              <TableCell>{expenseDate.date}</TableCell>

              <TableCell className="text-right">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(expenseDate.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => setCurrentPage(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MonthExpenseTable;
