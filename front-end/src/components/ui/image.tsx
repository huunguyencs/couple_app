import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import React, { useState } from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const Image: React.FC<ImageProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const onOpen = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    if (props.src && props.src.includes("http")) {
      setIsOpen(true);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden flex items-center justify-center bg-transparent border-none">
          <Button
            className="absolute right-2 top-2 z-50 rounded-full h-8 w-8 p-0 bg-black/70 hover:bg-black/90"
            onClick={onClose}
            size="icon"
            variant="ghost"
          >
            <X className="h-4 w-4 text-white" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="relative flex items-center justify-center w-full h-full max-h-[95vh]">
            <img
              {...props}
              className="max-w-full max-h-[95vh] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
      <img {...props} onClick={onOpen} />
    </>
  );
};

export default Image;
