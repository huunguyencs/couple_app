import AddButton from "@/components/AddButton";
import RestaurantItem from "@/components/Restaurant/RestaurantItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useMutate from "@/hooks/use-mutate";
import restaurantsService from "@/services/restaurants.service";
import { Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import RestaurantDialog from "../components/Restaurant/RestaurantDialog";
import SearchBar from "../components/SearchBar";
import { Restaurant } from "../types/Restaurant.type";
enum RestaurantTab {
  All = "all",
  Visited = "visited",
  ToVisit = "to-visit",
}

const Restaurants = () => {
  const {
    data: restaurants,
    fetching,
    submitting,
    deleting,
    error,
    fetchData,
    createData,
    updateData,
    deleteData,
  } = useMutate<Restaurant>({
    getService: restaurantsService.getRestaurants,
    postService: restaurantsService.createRestaurant,
    putService: restaurantsService.updateRestaurant,
    deleteService: restaurantsService.deleteRestaurant,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<RestaurantTab>(RestaurantTab.All);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [newRestaurant, setNewRestaurant] = useState<Omit<Restaurant, "id">>({
    name: "",
    address: "",
    cuisine: "",
    notes: "",
    image: "",
    visited: false,
    rating: 0,
  });

  const handleSubmitRestaurant = async () => {
    if (!newRestaurant.name) {
      toast.error("Vui lòng nhập tên quán ăn");
      return;
    }

    if (isEditing && selectedRestaurant) {
      await updateData(selectedRestaurant.id, newRestaurant);
      toast.success("Đã cập nhật quán ăn thành công!");
    } else {
      const restaurant = {
        ...newRestaurant,
        id: Date.now().toString(),
      };
      await createData(restaurant);
      toast.success("Đã thêm quán ăn mới!");
    }

    resetAndCloseDialog();
  };

  const handleDeleteRestaurant = async () => {
    if (selectedRestaurant) {
      await deleteData(selectedRestaurant.id);
      toast.success("Đã xoá quán ăn");
      resetAndCloseDialog();
    }
  };

  const resetAndCloseDialog = () => {
    setNewRestaurant({
      name: "",
      address: "",
      cuisine: "",
      notes: "",
      image: "",
      visited: false,
      rating: 0,
      tags: [],
    });
    setIsDialogOpen(false);
    setSelectedRestaurant(null);
    setIsEditing(false);
  };

  const handleViewRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setNewRestaurant({
      name: restaurant.name,
      address: restaurant.address,
      cuisine: restaurant.cuisine,
      notes: restaurant.notes,
      image: restaurant.image,
      visited: restaurant.visited,
      rating: restaurant.rating,
      tags: restaurant.tags || [],
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (error) toast.error(error.message || "Có lỗi xảy ra");
  }, [error]);

  return (
    <div className="p-4 pb-20">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-purple-400">Quán ăn</h1>
        <p className="text-muted-foreground mt-1">
          Những quán ăn nhất định phải thử
        </p>
      </div>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search restaurants..."
        className="mb-4"
      />

      <Tabs
        defaultValue={RestaurantTab.All}
        value={activeTab}
        onValueChange={(value: RestaurantTab) => setActiveTab(value)}
      >
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value={RestaurantTab.All}>Tất cả</TabsTrigger>
          <TabsTrigger value={RestaurantTab.Visited}>Đã ghé</TabsTrigger>
          <TabsTrigger value={RestaurantTab.ToVisit}>Chưa ghé</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {restaurants.length === 0 ? (
            <div className="text-center py-10">
              <Utensils className="h-16 w-16 text-purple-300 mx-auto animate-float" />
              <p className="text-muted-foreground mt-4">
                Không tìm thấy quán ăn nào hếc
              </p>
              <p className="text-sm text-muted-foreground">
                Thử sửa lại tìm kiếm hoặc thêm quán ăn mới nào đó đi beo iu!
              </p>
            </div>
          ) : (
            <div>
              {restaurants.map((restaurant) => (
                <RestaurantItem
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => handleViewRestaurant(restaurant)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="visited" className="mt-0">
          {restaurants.length === 0 ? (
            <div className="text-center py-10">
              <Utensils className="h-16 w-16 text-purple-300 mx-auto animate-float" />
              <p className="text-muted-foreground mt-4">
                Chưa có quán ăn nào đã ghé hếc
              </p>
              <p className="text-sm text-muted-foreground">
                Thêm quán ăn đã ghé nào đó đi beo iu!
              </p>
            </div>
          ) : (
            <div>
              {restaurants.map((restaurant) => (
                <RestaurantItem
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => handleViewRestaurant(restaurant)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="to-visit" className="mt-0">
          {restaurants.length === 0 ? (
            <div className="text-center py-10">
              <Utensils className="h-16 w-16 text-purple-300 mx-auto animate-float" />
              <p className="text-muted-foreground mt-4">
                Chưa có quán ăn nào chưa ghé hếc
              </p>
              <p className="text-sm text-muted-foreground">
                Thêm quán ăn mà beo iu muốn thử
              </p>
            </div>
          ) : (
            <div>
              {restaurants.map((restaurant) => (
                <RestaurantItem
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => handleViewRestaurant(restaurant)}
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

      <RestaurantDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isEditing={isEditing}
        newRestaurant={newRestaurant}
        setNewRestaurant={setNewRestaurant}
        handleSubmitRestaurant={handleSubmitRestaurant}
        handleDeleteRestaurant={handleDeleteRestaurant}
        resetAndCloseDialog={resetAndCloseDialog}
        submitting={submitting}
        deleting={deleting}
      />
    </div>
  );
};

export default Restaurants;
