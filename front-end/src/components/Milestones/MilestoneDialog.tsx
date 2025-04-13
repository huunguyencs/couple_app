import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Milestone } from "@/types/Milestones.type";

interface MilestoneDialogProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (isOpen: boolean) => void;
  isEditing: boolean;
  newMilestone: Omit<Milestone, "id">;
  setNewMilestone: React.Dispatch<React.SetStateAction<Omit<Milestone, "id">>>;
  handleSubmitMilestone: () => void;
  resetAndCloseDialog: () => void;
  submitting: boolean;
}

const MilestoneDialog = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  isEditing,
  newMilestone,
  setNewMilestone,
  handleSubmitMilestone,
  resetAndCloseDialog,
  submitting,
}: MilestoneDialogProps) => {
  const handleImageUpload = (imageData: string) => {
    setNewMilestone((prev) => ({
      ...prev,
      image: imageData,
    }));
  };

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="bg-white rounded-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-love-500">
            {isEditing ? "Sửa" : "Thêm"} cột mốc thui
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="title" className="text-sm font-medium">
              Tiêu đề điền dô đây ngen beo iuuuu*
            </label>
            <Input
              id="title"
              value={newMilestone.title}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, title: e.target.value })
              }
              placeholder="Ngày đầu tiên gặp nhau hay gì gì đó"
              className="bg-secondary/30 border-secondary"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="date" className="text-sm font-medium">
              Ngày nào á beo iu*
            </label>
            <Input
              id="date"
              type="date"
              value={newMilestone.date}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, date: e.target.value })
              }
              className="bg-secondary/30 border-secondary"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="location" className="text-sm font-medium">
              Ở đâu zậy beo iu
            </label>
            <Input
              id="location"
              value={newMilestone.location || ""}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, location: e.target.value })
              }
              placeholder="Mình gặp nhau ở đâu?"
              className="bg-secondary/30 border-secondary"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="image" className="text-sm font-medium">
              Cho xin ảnh ik beo iu
            </label>

            <ImageUpload
              onImageSelected={handleImageUpload}
              currentImage={newMilestone.image}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="description" className="text-sm font-medium">
              Có gì đặc biệt lưu ý hông beo iu*
            </label>
            <Textarea
              id="description"
              value={newMilestone.description}
              onChange={(e) =>
                setNewMilestone({
                  ...newMilestone,
                  description: e.target.value,
                })
              }
              placeholder="Điền dô điền dô ik beooooo"
              className="bg-secondary/30 border-secondary min-h-24"
            />
          </div>
        </div>

        <DialogFooter className="flex">
          <Button variant="outline" onClick={resetAndCloseDialog}>
            Hoy
          </Button>
          <Button
            onClick={handleSubmitMilestone}
            className="bg-love-400 hover:bg-love-500"
            isLoading={submitting}
          >
            Kê kê rồi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneDialog;
