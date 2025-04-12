import { Milestone } from "@/types/Milestones.type";
import instance from "./axios";

const milestonesService = {
  getMilestones: async (): Promise<Milestone[]> => {
    const response = await instance.get<Milestone[]>("/milestones");
    return response.data;
  },
  createMilestone: async (
    milestone: Omit<Milestone, "id">
  ): Promise<Milestone> => {
    const response = await instance.post<Milestone>("/milestones", milestone);
    return response.data;
  },
  updateMilestone: async (
    id: number,
    milestone: Partial<Milestone>
  ): Promise<Milestone> => {
    const response = await instance.put<Milestone>(
      `/milestones/${id}`,
      milestone
    );
    return response.data;
  },
  deleteMilestone: async (id: number): Promise<void> => {
    await instance.delete(`/milestones/${id}`);
  },
};
export default milestonesService;
