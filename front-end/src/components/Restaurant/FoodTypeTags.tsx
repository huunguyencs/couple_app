import { Badge } from "@/components/ui/badge";
import { FOOD_TYPES } from "@/constants/restaurants";
import { X } from "lucide-react";
import React from "react";

interface FoodTypeTagsProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  className?: string;
}

const FoodTypeTags: React.FC<FoodTypeTagsProps> = ({
  selectedTags,
  onTagToggle,
  className,
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className || ""}`}>
      {FOOD_TYPES.map((type) => {
        const isSelected = selectedTags.includes(type);
        return (
          <Badge
            key={type}
            variant={isSelected ? "default" : "outline"}
            className={`cursor-pointer ${
              isSelected
                ? "bg-purple-400 hover:bg-purple-500"
                : "hover:bg-purple-100"
            }`}
            onClick={() => onTagToggle(type)}
          >
            {type}
            {isSelected && <X className="ml-1 h-3 w-3" />}
          </Badge>
        );
      })}
    </div>
  );
};

export default FoodTypeTags;
