import { Badge } from "@/components/ui/badge";
import Image from "@/components/ui/image";
import { Restaurant } from "@/types/Restaurant.type";

interface RestaurantItemProps {
  restaurant: Restaurant;
  onClick: () => void;
}

const RestaurantItem = ({ restaurant, onClick }: RestaurantItemProps) => {
  return (
    <div
      className="love-card mb-4 cursor-pointer animate-fade-in hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      {restaurant.image && (
        <div className="h-32 w-full mb-2 rounded-lg overflow-hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium">{restaurant.name}</h3>
        <Badge className={restaurant.visited ? "bg-love-400" : "bg-purple-300"}>
          {restaurant.visited ? "Đã ghé" : "Chưa ghé"}
        </Badge>
      </div>

      {restaurant.cuisine && (
        <p className="text-xs text-muted-foreground mt-1">
          {restaurant.cuisine}
        </p>
      )}

      {restaurant.address && (
        <p className="text-sm mt-2">📍 {restaurant.address}</p>
      )}

      {restaurant.notes && (
        <p className="text-sm text-foreground/80 mt-2 line-clamp-2">
          {restaurant.notes}
        </p>
      )}

      {restaurant.tags && restaurant.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {restaurant.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs py-0">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantItem;
