import DiffDay from "@/components/DiffDay";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "@/components/ui/image";
import { formatDate } from "@/lib/datetime";
import { Milestone } from "@/types/Milestones.type";
import { Heart } from "lucide-react";

interface MilestoneDetailProps {
  milestone: Milestone | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
}

const MilestoneDetail = ({
  milestone,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  deleting,
}: MilestoneDetailProps) => {
  if (!milestone) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-xl border border-love-200 max-w-md animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-2xl text-love-500 flex items-center gap-2">
            <Heart className="h-5 w-5 fill-love-400" />
            {milestone.title}
          </DialogTitle>
          <div className="text-sm text-muted-foreground">
            {formatDate(new Date(milestone.date))}
            <span className="text-xs ml-2">
              (<DiffDay date={new Date(milestone.date)} />)
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {milestone.image && (
            <div className="rounded-lg overflow-hidden shadow-sm">
              <Image
                src={milestone.image}
                alt={milestone.title}
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          <p className="text-foreground leading-relaxed">
            {milestone.description}
          </p>

          {milestone.location && (
            <div className="text-sm text-muted-foreground">
              📍 {milestone.location}
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button variant="outline" onClick={onEdit}>
            Sửa
          </Button>
          <Button variant="destructive" onClick={onDelete} isLoading={deleting}>
            Xoá
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneDetail;
