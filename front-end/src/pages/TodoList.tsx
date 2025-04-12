import AddButton from "@/components/AddButton";
import TodoDialog from "@/components/TodoList/TodoDialog";
import TodoItem from "@/components/TodoList/TodoItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TodoPriority } from "@/enum/TodoPriority.enum";
import useMutate from "@/hooks/use-mutate";
import todoService from "@/services/todo.service";
import { Todo } from "@/types/TodoList.type";
import { CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

enum TodoTab {
  All = "all",
  Active = "active",
  Completed = "completed",
}

const TodoList = () => {
  const {
    data: todos,
    fetching,
    submitting,
    deleting,
    error,
    fetchData,
    createData,
    updateData,
    deleteData,
  } = useMutate({
    getService: todoService.getTodos,
    postService: todoService.createTodo,
    putService: todoService.updateTodo,
    deleteService: todoService.deleteTodo,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TodoTab>(TodoTab.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [newTodo, setNewTodo] = useState<Omit<Todo, "id" | "completed">>({
    title: "",
    description: "",
    dueDate: "",
    priority: TodoPriority.Medium,
  });

  const handleSubmitTodo = async () => {
    if (!newTodo.title) {
      toast.error("Vui lòng nhập tiêu đề");
      return;
    }

    if (isEditing && selectedTodo) {
      await updateData(selectedTodo.id, newTodo);
      toast.success("Todo updated successfully!");
    } else {
      const todo = {
        ...newTodo,
        id: Date.now().toString(),
        completed: false,
      };
      await createData(todo);
      toast.success("Đã thêm công việc!");
    }

    resetAndCloseDialog();
  };

  const handleDeleteTodo = async () => {
    if (selectedTodo) {
      await deleteData(selectedTodo.id);
      toast.success("Đã xoá công việc!");
      resetAndCloseDialog();
    }
  };

  const handleToggleComplete = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      await updateData(id, { completed: !todo.completed });
      toast(
        todo.completed
          ? "Công việc chưa hoàn thành"
          : "Công việc đã hoàn thành!",
        {
          description: todo.title,
        }
      );
    }
  };

  const resetAndCloseDialog = () => {
    setNewTodo({
      title: "",
      description: "",
      dueDate: "",
      priority: TodoPriority.Medium,
    });
    setIsDialogOpen(false);
    setSelectedTodo(null);
    setIsEditing(false);
  };

  const handleViewTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setNewTodo({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      priority: todo.priority,
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const filteredTodos = todos.filter((todo) => {
    if (activeTab === TodoTab.Active) return !todo.completed;
    if (activeTab === TodoTab.Completed) return todo.completed;
    return true;
  });

  // Sort todos by priority and due date
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (error) toast.error(error.message || "Có lỗi xảy ra");
  }, [error]);

  return (
    <div className="p-4 pb-20">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-accent">
          Danh sách việc cần làm
        </h1>
        <p className="text-muted-foreground mt-1">
          Những điều chúng ta muốn làm
        </p>
      </div>

      <Tabs
        defaultValue={TodoTab.All}
        value={activeTab}
        onValueChange={(value: TodoTab) => setActiveTab(value)}
      >
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value={TodoTab.All}>Tất cả</TabsTrigger>
          <TabsTrigger value={TodoTab.Active}>Muốn làm</TabsTrigger>
          <TabsTrigger value={TodoTab.Completed}>Đã làm</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {todos.length === 0 ? (
            <div className="text-center py-10">
              <CheckCheck className="h-16 w-16 text-accent/50 mx-auto animate-float" />
              <p className="text-muted-foreground mt-4">
                Chưa có việc nào trong danh sách
              </p>
              <p className="text-sm text-muted-foreground">
                Thêm một việc gì đó để làm cùng nhau!
              </p>
            </div>
          ) : (
            <div>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleComplete={() => handleToggleComplete(todo.id)}
                  onClick={() => handleViewTodo(todo)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          {todos.length === 0 ? (
            <div className="text-center py-10">
              <CheckCheck className="h-16 w-16 text-accent/50 mx-auto animate-float" />
              <p className="text-muted-foreground mt-4">
                Chưa có công việc muốn làm
              </p>
              <p className="text-sm text-muted-foreground">
                Tất cả công việc đã hoàn thành rồi!
              </p>
            </div>
          ) : (
            <div>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleComplete={() => handleToggleComplete(todo.id)}
                  onClick={() => handleViewTodo(todo)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          {todos.length === 0 ? (
            <div className="text-center py-10">
              <CheckCheck className="h-16 w-16 text-accent/50 mx-auto animate-float" />
              <p className="text-muted-foreground mt-4">
                Chưa có việc nào hoàn thành
              </p>
              <p className="text-sm text-muted-foreground">
                Cùng nhau hoàn thành một việc gì đó nhé!
              </p>
            </div>
          ) : (
            <div>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleComplete={() => handleToggleComplete(todo.id)}
                  onClick={() => handleViewTodo(todo)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AddButton
        onClick={() => {
          setIsEditing(false);
          setIsDialogOpen(true);
        }}
      />

      <TodoDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isEditing={isEditing}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        handleSubmitTodo={handleSubmitTodo}
        handleDeleteTodo={handleDeleteTodo}
        resetAndCloseDialog={resetAndCloseDialog}
        submitting={submitting}
        deleting={deleting}
      />
    </div>
  );
};

export default TodoList;
