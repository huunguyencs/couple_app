import instance from "@/services/axios";
import { Todo } from "@/types/TodoList.type";

const todoService = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await instance.get<Todo[]>("/todos");
    return response.data;
  },
  createTodo: async (todo: Omit<Todo, "id">): Promise<Todo> => {
    const response = await instance.post<Todo>("/todos", todo);
    return response.data;
  },
  updateTodo: async (id: number, todo: Partial<Todo>): Promise<Todo> => {
    const response = await instance.put<Todo>(`/todos/${id}`, todo);
    return response.data;
  },
  deleteTodo: async (id: number) => {
    await instance.delete(`/todos/${id}`);
  },
};

export default todoService;
