import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        purple:
          "border-transparent bg-purple-500 text-white hover:bg-purple-500/80",
        blue: "border-transparent bg-blue-500 text-white hover:bg-blue-500/80",
        green:
          "border-transparent bg-green-500 text-white hover:bg-green-500/80",
        red: "border-transparent bg-red-500 text-white hover:bg-red-500/80",
        yellow:
          "border-transparent bg-yellow-500 text-black hover:bg-yellow-500/80",
        pink: "border-transparent bg-pink-500 text-white hover:bg-pink-500/80",
        gray: "border-transparent bg-gray-500 text-white hover:bg-gray-500/80",
        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-muted",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.25 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      removable: {
        true: "pr-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      removable: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function Badge({
  className,
  variant,
  size,
  removable,
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size, removable }), className)}
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
