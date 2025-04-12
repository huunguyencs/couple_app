import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TodoPriority } from "@/enum/TodoPriority.enum";
import { cn } from "@/lib/utils";
import { Todo } from "@/types/TodoList.type";
import { differenceInDays } from "date-fns";
import { useState } from "react";

function priorityMapping(priority: TodoPriority) {
  switch (priority) {
    case "high":
      return "Cao";
    case "medium":
      return "Trung bình";
    case "low":
      return "Thấp";
    default:
      return "Không xác định";
  }
}

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: () => void;
  onClick: () => void;
}

const TodoItem = ({ todo, onToggleComplete, onClick }: TodoItemProps) => {
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsChecking(true);
    setTimeout(() => {
      onToggleComplete();
      setIsChecking(false);
    }, 300);
  };

  return (
    <div
      className="love-card mb-4 cursor-pointer animate-fade-in hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex items-start gap-2">
        <div onClick={handleCheckboxClick}>
          <Checkbox
            checked={todo.completed}
            className={cn(
              "rounded-full h-5 w-5 mt-1",
              todo.completed ? "bg-accent border-accent" : "border-accent/50",
              isChecking && "animate-pulse"
            )}
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3
              className={cn(
                "text-lg font-medium transition-all duration-300",
                todo.completed && "line-through text-muted-foreground"
              )}
            >
              {todo.title}
            </h3>

            {todo.priority && (
              <Badge
                className={cn(
                  "ml-2",
                  todo.priority === "high"
                    ? "bg-love-500"
                    : todo.priority === "medium"
                    ? "bg-love-400"
                    : "bg-love-200"
                )}
              >
                {priorityMapping(todo.priority)}
              </Badge>
            )}
          </div>

          {todo.dueDate && (
            <p className="text-xs text-muted-foreground mt-1">
              Đến hạn: {new Date(todo.dueDate).toLocaleDateString()} ( còn{" "}
              {differenceInDays(new Date(todo.dueDate), new Date())} ngày)
            </p>
          )}

          {todo.description && (
            <p className="text-sm text-foreground/80 mt-2 line-clamp-2">
              {todo.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
