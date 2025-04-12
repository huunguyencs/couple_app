import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";

import { Dialog } from "./ui/dialog";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmDialog = ({
  isOpen,
  onClose,
  onDelete,
}: DeleteConfirmDialogProps) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Xoá</DialogTitle>
        <DialogDescription>Beo có chắc chắn muốn xoá không?</DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Thôi
          </Button>
          <Button onClick={handleDelete}>Xoá ik</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
