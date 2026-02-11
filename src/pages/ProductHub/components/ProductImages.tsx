import React, { useRef } from "react";
import SectionHeader from "../../../components/SectionHeader";
import ImagePreviewCard from "./ImagePreviewCard";
import AddImageCard from "./AddImageCard";
import { toast } from "sonner";
import ProductImagesHelperText from "./ProductImagesHelperText";

interface ProductImagesProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  previewImages: string[];
  setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const MAX_IMAGES = 6;
const MAX_IMAGE_SIZE = 1 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ProductImages = ({
  images,
  setImages,
  previewImages,
  setPreviewImages,
}: ProductImagesProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddImages = (files: FileList) => {
    const newFiles: File[] = [];
    const newPreviews: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (images.length + newFiles.length >= MAX_IMAGES) {
        toast.warning(`Você pode adicionar no máximo ${MAX_IMAGES} imagens`);
        break;
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.warning("Formato de imagem não suportado");
        continue;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        toast.warning("Cada imagem deve ter no máximo 1MB");
        continue;
      }

      newFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    if (newFiles.length === 0) return;

    setImages((prev) => [...prev, ...newFiles]);
    setPreviewImages((prev) => [...prev, ...newPreviews]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));

    setPreviewImages((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <SectionHeader step={1} title="Fotos do Produto" />

      <input
        ref={inputRef}
        type="file"
        id="photos"
        className="hidden"
        multiple
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) handleAddImages(e.target.files);
        }}
      />

      <div className="grid lg:grid-cols-6 gap-3 grid-cols-2 sm:grid-cols-3">
        {previewImages.map((img, i) => (
          <ImagePreviewCard
            key={i}
            src={img}
            alt={`Foto ${i + 1}`}
            onRemove={() => handleRemoveImage(i)}
          />
        ))}

        {images.length < MAX_IMAGES && <AddImageCard />}
      </div>

      <ProductImagesHelperText />
    </div>
  );
};

export default ProductImages;
