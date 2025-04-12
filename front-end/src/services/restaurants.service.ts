import instance from "@/services/axios";
import { Restaurant } from "@/types/Restaurant.type";
const restaurantsService = {
  getRestaurants: async (): Promise<Restaurant[]> => {
    const response = await instance.get<Restaurant[]>("/restaurants");
    return response.data;
  },
  createRestaurant: async (
    restaurant: Omit<Restaurant, "id">
  ): Promise<Restaurant> => {
    const response = await instance.post<Restaurant>(
      "/restaurants",
      restaurant
    );
    return response.data;
  },
  updateRestaurant: async (
    id: number,
    restaurant: Partial<Restaurant>
  ): Promise<Restaurant> => {
    const response = await instance.put<Restaurant>(
      `/restaurants/${id}`,
      restaurant
    );
    return response.data;
  },
  deleteRestaurant: async (id: number) => {
    await instance.delete(`/restaurants/${id}`);
  },
};

export default restaurantsService;
