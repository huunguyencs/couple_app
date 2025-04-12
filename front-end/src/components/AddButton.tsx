import { Plus } from "lucide-react";

interface AddButtonProps {
  onClick: () => void;
  className?: string;
}

const AddButton = ({ onClick, className = "" }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`heart-button fixed bottom-20 right-6 z-10 ${className}`}
      aria-label="Add new item"
    >
      <Plus className="h-6 w-6" />
    </button>
  );
};

export default AddButton;
