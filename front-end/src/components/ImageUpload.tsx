import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageSelected: (imageData: string) => void;
  currentImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelected,
  currentImage,
}) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    currentImage
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Chọn file ảnh thôi beo iu");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File ảnh quá lớn (tối đa 5MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setPreviewImage(imageData);
      onImageSelected(imageData);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={triggerFileInput}
          className="flex-1"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload ảnh
        </Button>
        <Button type="button" variant="outline" onClick={handleCameraCapture}>
          <Camera className="h-4 w-4" />
        </Button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept="image/*"
      />

      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept="image/*"
        capture="environment"
      />

      {previewImage && (
        <div className="mt-4 relative">
          <img
            src={previewImage}
            alt="Restaurant preview"
            className="w-full h-40 object-cover rounded-md"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0"
            onClick={() => {
              setPreviewImage(undefined);
              onImageSelected("");
            }}
          >
            &times;
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
