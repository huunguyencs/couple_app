import { differenceInDays, formatDistance } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { useState } from "react";

interface DiffDayProps {
  date: Date;
  isDueDate?: boolean;
  addSuffix?: boolean;
}

type DiffDayFormat = "days" | "ago";

const DiffDay = ({
  date,
  isDueDate = false,
  addSuffix = false,
}: DiffDayProps) => {
  const [format, setFormat] = useState<DiffDayFormat>("days");

  const changeFormat = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    if (format === "days") {
      setFormat("ago");
    } else {
      setFormat("days");
    }
  };

  const diffDays =
    format === "days"
      ? `${isDueDate ? "còn" : ""} ${differenceInDays(new Date(), date)} ngày`
      : formatDistance(new Date(), date, {
          addSuffix,
          locale: vi,
        });
  return <span onClick={changeFormat}>{diffDays}</span>;
};

export default DiffDay;
