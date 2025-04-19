import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarRange } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface DateRangeFilterProps {
  onDateRangeChange: (range: DateRange) => void;
}

const DateRangeFilter = ({ onDateRangeChange }: DateRangeFilterProps) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    onDateRangeChange(range);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <CalendarRange className="h-4 w-4" />
            {dateRange.from || dateRange.to ? (
              <span>
                {dateRange.from
                  ? format(dateRange.from, "dd/MM/yyyy")
                  : "Ngày bắt đầu"}
                {" - "}
                {dateRange.to
                  ? format(dateRange.to, "dd/MM/yyyy")
                  : "Ngày kết thúc"}
              </span>
            ) : (
              "Chọn ngày"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <CalendarComponent
            mode="range"
            selected={{
              from: dateRange.from,
              to: dateRange.to,
            }}
            onSelect={handleDateRangeChange}
            initialFocus
            className="pointer-events-auto"
            footer={
              (dateRange.from || dateRange.to) && (
                <div className="px-4 pb-2 pt-0 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setDateRange({ from: undefined, to: undefined })
                    }
                    className="mt-2"
                  >
                    Xóa
                  </Button>
                </div>
              )
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeFilter;
