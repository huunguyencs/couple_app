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

export const EXPENSE_CATEGORIES_COLORS_CHART = {
  [EXPENSE_CATEGORIES.NECESSITIES]: "rgb(59 130 246 / 1)",
  [EXPENSE_CATEGORIES.PLAY]: "rgb(108 74 166 / 1)",
  [EXPENSE_CATEGORIES.EDUCATION]: "rgb(34 197 94 / 1)",
  [EXPENSE_CATEGORIES.OTHER]: "rgb(107 114 128 / 1)",
};
