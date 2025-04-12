import AddButton from "@/components/AddButton";
import MilestoneDetail from "@/components/Milestones/MilestoneDetail";
import MilestoneItem from "@/components/Milestones/MilestoneItem";
import PageLoader from "@/components/PageLoader";
import useMutate from "@/hooks/use-mutate";
import milestonesService from "@/services/milestones.service";
import { Milestone } from "@/types/Milestones.type";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import MilestoneDialog from "../components/Milestones/MilestoneDialog";

const Milestones = () => {
  const {
    data: milestones,
    fetching,
    submitting,
    deleting,
    error,
    fetchData,
    createData,
    updateData,
    deleteData,
  } = useMutate<Milestone>({
    getService: milestonesService.getMilestones,
    postService: milestonesService.createMilestone,
    putService: milestonesService.updateMilestone,
    deleteService: milestonesService.deleteMilestone,
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState<Omit<Milestone, "id">>({
    title: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    image: "",
    location: "",
  });
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmitMilestone = async () => {
    if (
      !newMilestone.title ||
      !newMilestone.date ||
      !newMilestone.description
    ) {
      toast.error("Điền mấy chỗ bắt buộc đi beo iu");
      return;
    }

    if (isEditing && selectedMilestone) {
      await updateData(selectedMilestone.id, newMilestone);
      toast.success("Cột mốc đã được cập nhật!");
    } else {
      await createData(newMilestone);
      toast.success("Cột mốc đã được thêm!");
    }

    resetAndCloseDialog();
    await fetchData();
  };

  const handleDeleteMilestone = async () => {
    if (selectedMilestone) {
      await deleteData(selectedMilestone.id);
      setIsViewDialogOpen(false);
      setSelectedMilestone(null);
      toast.success("Cột mốc đã được xóa!");
      await fetchData();
    }
  };

  const handleViewMilestone = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setIsViewDialogOpen(true);
  };

  const handleEditMilestone = () => {
    if (selectedMilestone) {
      setNewMilestone({
        title: selectedMilestone.title,
        date: new Date(selectedMilestone.date).toISOString().split("T")[0],
        description: selectedMilestone.description,
        image: selectedMilestone.image,
        location: selectedMilestone.location,
      });
      setIsEditing(true);
      setIsViewDialogOpen(false);
      setIsAddDialogOpen(true);
    }
  };

  const resetAndCloseDialog = () => {
    setNewMilestone({
      title: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      image: "",
      location: "",
    });
    setIsAddDialogOpen(false);
    setIsEditing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || "Có lỗi xảy ra.");
    }
  }, [error]);

  return (
    <div className="p-4 pb-20">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-love-500">Cột mốc</h1>
        <p className="text-muted-foreground mt-1">
          Những cột mốc đáng nhớ của chúng ta
        </p>
      </div>

      <div className="relative">
        {milestones.length > 0 && <div className="timeline-line"></div>}

        {fetching ? (
          <PageLoader type="milestone" />
        ) : milestones.length === 0 ? (
          <div className="text-center py-10">
            <Heart className="h-16 w-16 text-love-200 mx-auto animate-pulse-heart" />
            <p className="text-muted-foreground mt-4">
              Chưa có cột mốc nào hếc
            </p>
            <p className="text-sm text-muted-foreground">
              Thêm khoảnh khắc đặc biệt đầu tiên của chúng ta!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <MilestoneItem
                key={milestone.id}
                milestone={milestone}
                onClick={() => handleViewMilestone(milestone)}
              />
            ))}
          </div>
        )}
      </div>

      <AddButton onClick={() => setIsAddDialogOpen(true)} />

      <MilestoneDialog
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        isEditing={isEditing}
        newMilestone={newMilestone}
        setNewMilestone={setNewMilestone}
        handleSubmitMilestone={handleSubmitMilestone}
        resetAndCloseDialog={resetAndCloseDialog}
        submitting={submitting}
      />

      <MilestoneDetail
        milestone={selectedMilestone}
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        onEdit={handleEditMilestone}
        onDelete={handleDeleteMilestone}
        deleting={deleting}
      />
    </div>
  );
};

export default Milestones;
