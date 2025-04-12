import { TodoPriority } from "../enum/TodoPriority.enum";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  priority?: TodoPriority;
}
