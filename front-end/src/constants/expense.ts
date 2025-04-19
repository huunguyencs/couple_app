export const EXPENSE_CATEGORIES = {
  NECESSITIES: "NECESSITIES",
  PLAY: "PLAY",
  EDUCATION: "EDUCATION",
  OTHER: "OTHER",
};

export const EXPENSE_CATEGORIES_MAPPING = {
  [EXPENSE_CATEGORIES.NECESSITIES]: {
    color: "bg-blue-500",
    icon: "home",
  },
  [EXPENSE_CATEGORIES.PLAY]: {
    color: "bg-purple-500",
    icon: "gamepad-2",
  },
  [EXPENSE_CATEGORIES.EDUCATION]: {
    color: "bg-green-500",
    icon: "book-open",
  },
  [EXPENSE_CATEGORIES.OTHER]: {
    color: "bg-gray-500",
    icon: "ellipsis-horizontal",
  },
};
