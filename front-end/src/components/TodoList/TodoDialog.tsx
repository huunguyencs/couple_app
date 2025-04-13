import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TodoPriority } from "@/enum/TodoPriority.enum";
import { Todo } from "@/types/TodoList.type";

import DeleteButton from "@/components/DeleteButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
interface TodoDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  isEditing: boolean;
  newTodo: Omit<Todo, "id" | "completed">;
  setNewTodo: React.Dispatch<
    React.SetStateAction<Omit<Todo, "id" | "completed">>
  >;
  handleSubmitTodo: () => void;
  handleDeleteTodo: () => void;
  resetAndCloseDialog: () => void;
  submitting: boolean;
  deleting: boolean;
}

const TodoDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  isEditing,
  newTodo,
  setNewTodo,
  handleSubmitTodo,
  handleDeleteTodo,
  resetAndCloseDialog,
  submitting,
  deleting,
}: TodoDialogProps) => {
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) resetAndCloseDialog();
        else setIsDialogOpen(true);
      }}
    >
      <DialogContent className="bg-white rounded-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-accent">
            {isEditing ? "Sửa" : "Thêm"} công việc thui
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="title" className="text-sm font-medium">
              Tiêu đề điền dô đây ngen beo iuuuu*
            </label>
            <Input
              id="title"
              value={newTodo.title}
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
              placeholder="Beo iu muốn làm gì đâyyyy"
              className="bg-purple-100/30 border-purple-100"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="description" className="text-sm font-medium">
              Làm gì làm gì làm gìiiii
            </label>
            <Textarea
              id="description"
              value={newTodo.description || ""}
              onChange={(e) =>
                setNewTodo({ ...newTodo, description: e.target.value })
              }
              placeholder="Nhập cho tui cái mô tả để tui còn biết ik beo iu"
              className="bg-purple-100/30 border-purple-100 min-h-20"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="dueDate" className="text-sm font-medium">
              Ngày nào hếc hạn đó beo iu
            </label>
            <Input
              id="dueDate"
              type="date"
              value={newTodo.dueDate || ""}
              onChange={(e) =>
                setNewTodo({ ...newTodo, dueDate: e.target.value })
              }
              className="bg-purple-100/30 border-purple-100"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ưu tiên</label>
            <RadioGroup
              value={newTodo.priority || "medium"}
              onValueChange={(value: TodoPriority) =>
                setNewTodo({ ...newTodo, priority: value })
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={TodoPriority.Low} id="low" />
                <Label htmlFor="low">Thấp</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={TodoPriority.Medium} id="medium" />
                <Label htmlFor="medium">Thường thường</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={TodoPriority.High} id="high" />
                <Label htmlFor="high">Cao</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter className="flex gap-2 flex-col sm:flex-row">
          {isEditing && (
            <DeleteButton onDelete={handleDeleteTodo} isDeleting={deleting} />
          )}
          <div className="grow flex gap-2 sm:justify-end">
            <Button variant="outline" onClick={resetAndCloseDialog}>
              Hoy
            </Button>
            <Button
              onClick={handleSubmitTodo}
              className="bg-accent hover:bg-accent/80"
              isLoading={submitting}
            >
              Kê kê rồi
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TodoDialog;
