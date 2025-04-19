import { EXPENSE_CATEGORIES_MAPPING } from "@/constants/expense";
import {
  BookOpen,
  Gamepad2,
  Heart,
  Home,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

export function getCategoryIcon(iconName: string) {
  switch (iconName) {
    case "home":
      return <Home className="h-5 w-5" />;
    case "gamepad-2":
      return <Gamepad2 className="h-5 w-5" />;
    case "book-open":
      return <BookOpen className="h-5 w-5" />;
    case "piggy-bank":
      return <PiggyBank className="h-5 w-5" />;
    case "trending-up":
      return <TrendingUp className="h-5 w-5" />;
    case "heart-handshake":
      return <Heart className="h-5 w-5" />;
    default:
      return <Home className="h-5 w-5" />;
  }
}

export function mappingCategoryIcon(code: string) {
  return (
    EXPENSE_CATEGORIES_MAPPING[code] || {
      icon: "home",
      color: "bg-blue-500",
    }
  );
}
