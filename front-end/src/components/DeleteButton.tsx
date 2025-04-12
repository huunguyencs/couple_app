import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
interface DeleteButtonProps {
  onDelete: () => void;
  isDeleting: boolean;
}

const DeleteButton = ({ onDelete, isDeleting }: DeleteButtonProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    onDelete();
    setShowConfirm(false);
  };

  return (
    <>
      <Button
        isLoading={isDeleting}
        variant="destructive"
        onClick={() => setShowConfirm(true)}
      >
        Xoá
      </Button>
      <DeleteConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

export default DeleteButton;
