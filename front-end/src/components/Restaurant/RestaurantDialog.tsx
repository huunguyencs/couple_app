import DeleteButton from "@/components/DeleteButton";
import ImageUpload from "@/components/ImageUpload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FOOD_TYPES } from "@/constants/restaurants";
import { Restaurant } from "@/types/Restaurant.type";
import { X } from "lucide-react";
import { useState } from "react";

interface RestaurantDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  isEditing: boolean;
  newRestaurant: Omit<Restaurant, "id">;
  setNewRestaurant: React.Dispatch<
    React.SetStateAction<Omit<Restaurant, "id">>
  >;
  handleSubmitRestaurant: () => void;
  handleDeleteRestaurant: () => void;
  resetAndCloseDialog: () => void;
  submitting: boolean;
  deleting: boolean;
}

const RestaurantDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  isEditing,
  newRestaurant,
  setNewRestaurant,
  handleSubmitRestaurant,
  handleDeleteRestaurant,
  resetAndCloseDialog,
  submitting,
  deleting,
}: RestaurantDialogProps) => {
  const [tagSearchOpen, setTagSearchOpen] = useState(false);

  const handleTagToggle = (tag: string) => {
    setNewRestaurant((prev) => {
      const currentTags = [...(prev.tags || [])];

      if (currentTags.includes(tag)) {
        return {
          ...prev,
          tags: currentTags.filter((t) => t !== tag),
        };
      } else {
        return {
          ...prev,
          tags: [...currentTags, tag],
        };
      }
    });
  };

  const handleImageUpload = (imageData: string) => {
    setNewRestaurant((prev) => ({
      ...prev,
      image: imageData,
    }));
  };

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
          <DialogTitle className="text-purple-400">
            {isEditing ? "Sửa" : "Thêm"} quán ăn thui
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium">
              Quán tên gì ó beo iu*
            </label>
            <Input
              id="name"
              value={newRestaurant.name}
              onChange={(e) =>
                setNewRestaurant({ ...newRestaurant, name: e.target.value })
              }
              placeholder="Cho xin cái tên đi beo iu"
              className="bg-purple-100/30 border-purple-100"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="cuisine" className="text-sm font-medium">
              Quán gì đó beo iu
            </label>
            <Input
              id="cuisine"
              value={newRestaurant.cuisine || ""}
              onChange={(e) =>
                setNewRestaurant({
                  ...newRestaurant,
                  cuisine: e.target.value,
                })
              }
              placeholder="Đồ Quảng, món Hàn hay là mỳ cay, ..."
              className="bg-purple-100/30 border-purple-100"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="address" className="text-sm font-medium">
              Quán ở đâu zậy beo iu
            </label>
            <Input
              id="address"
              value={newRestaurant.address || ""}
              onChange={(e) =>
                setNewRestaurant({
                  ...newRestaurant,
                  address: e.target.value,
                })
              }
              placeholder="Điền link google map vô cho dễ"
              className="bg-purple-100/30 border-purple-100"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">
              Gắn thẻ cho quán ik beo iu
            </label>
            <div className="flex items-center gap-2">
              <Popover open={tagSearchOpen} onOpenChange={setTagSearchOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={tagSearchOpen}
                    className="w-full justify-between"
                  >
                    Chọn loại món ăn ik beo
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search food types..." />
                    <CommandList>
                      <CommandEmpty>Không tìm thấy gì hếc.</CommandEmpty>
                      <CommandGroup>
                        {FOOD_TYPES.map((type) => (
                          <CommandItem
                            key={type}
                            onSelect={() => {
                              handleTagToggle(type);
                            }}
                          >
                            <div className="flex items-center">
                              <span
                                className={
                                  newRestaurant.tags?.includes(type)
                                    ? "font-bold"
                                    : ""
                                }
                              >
                                {type}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
              {newRestaurant.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="visited"
              checked={newRestaurant.visited}
              onCheckedChange={(checked) =>
                setNewRestaurant({ ...newRestaurant, visited: checked })
              }
            />
            <Label htmlFor="visited">Mình đã ghé quán ăn này?</Label>
          </div>
          <div className="space-y">
            <label htmlFor="uploadImage" className="text-sm font-medium">
              Cho xin ảnh ik beo iu
            </label>
            <ImageUpload
              onImageSelected={handleImageUpload}
              currentImage={newRestaurant.image}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="notes" className="text-sm font-medium">
              Note note note gì đó ikkkk
            </label>
            <Textarea
              id="notes"
              value={newRestaurant.notes || ""}
              onChange={(e) =>
                setNewRestaurant({ ...newRestaurant, notes: e.target.value })
              }
              placeholder="Cảm nhận, ghi chú về quán ăn ..."
              className="bg-purple-100/30 border-purple-100 min-h-20"
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2 flex-col sm:flex-row">
          {isEditing && (
            <DeleteButton
              onDelete={handleDeleteRestaurant}
              isDeleting={deleting}
            />
          )}
          <div className="grow flex gap-2 sm:justify-end">
            <Button variant="outline" onClick={resetAndCloseDialog}>
              Hoy
            </Button>
            <Button
              onClick={handleSubmitRestaurant}
              className="bg-purple-400 hover:bg-purple-500"
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

export default RestaurantDialog;
