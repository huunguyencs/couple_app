import DiffDay from "@/components/DiffDay";
import Image from "@/components/ui/image";
import { Milestone } from "@/types/Milestones.type";
import { Heart } from "lucide-react";

interface MilestoneItemProps {
  milestone: Milestone;
  onClick: () => void;
}

const MilestoneItem = ({ milestone, onClick }: MilestoneItemProps) => {
  return (
    <div
      className="pl-10 pr-4 py-3 relative animate-fade-in cursor-pointer hover:bg-love-100/20 transition-colors rounded-lg"
      onClick={onClick}
    >
      <div className="timeline-dot"></div>
      <div className="love-card">
        <h3 className="text-lg text-love-500 flex items-center gap-1.5">
          <Heart className="h-4 w-4 fill-love-300" />
          {milestone.title}
        </h3>
        <time className="text-xs text-muted-foreground">
          {new Date(milestone.date).toLocaleDateString()}
          <span className="ml-1">
            (<DiffDay date={new Date(milestone.date)} />)
          </span>
        </time>
        <p className="text-sm mt-2 line-clamp-2 text-foreground/80">
          {milestone.description}
        </p>

        {milestone.image && (
          <div className="mt-2 rounded-lg overflow-hidden h-20 w-full">
            <Image
              src={milestone.image}
              alt={milestone.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {milestone.location && (
          <div className="text-xs text-muted-foreground mt-2">
            📍 {milestone.location}
          </div>
        )}
      </div>
    </div>
  );
};

export default MilestoneItem;
