import { useRef } from "react";

interface ReviewPhotoUploadProps {
  imagePreview: string;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const ReviewPhotoUpload = ({
  setImage,
  imagePreview,
}: ReviewPhotoUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRemoveImage = () => {
    setImage(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm">Sua foto (opcional)</p>
      <div className="flex items-center gap-4">
        <div className="rounded-full w-18 h-18 relative border-gray-300 border">
          {imagePreview && (
            <button
              onClick={handleRemoveImage}
              type="button"
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-300"
            >
              <i className="bi bi-x text-sm" />
            </button>
          )}

          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Foto de identificação de quem fez a avaliação"
              className="object-cover rounded-full h-full w-full border-2 border-emerald-600"
            />
          ) : (
            <i className="bi bi-person-circle text-7xl text-gray-500" />
          )}
        </div>
        <div className="flex flex-col gap-2 items-start">
          <input
            ref={inputRef}
            type="file"
            id="profilePhoto"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) setImage(selectedFile);
            }}
          />
          <label
            htmlFor="profilePhoto"
            className="bg-orange-400 text-white rounded-xl px-4 py-1 text-sm cursor-pointer hover:-translate-y-0.5 transition-transform duration-300"
          >
            {imagePreview ? "Trocar foto" : "Adicionar foto"}
          </label>
          <p className="text-gray-500 text-xs">JPG, PNG ou GIF. Máximo 5MB.</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPhotoUpload;
