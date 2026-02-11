import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

interface StoreAvatarUploadProps {
  onProfilePhotoChange: (value: File | null) => void;
  resetTrigger?: boolean;
}

const MAX_IMAGE_SIZE = 1 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const StoreAvatarUpload = ({
  onProfilePhotoChange,
  resetTrigger,
}: StoreAvatarUploadProps) => {
  const [preview, setPreview] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.warning("Formato inválido. Use JPG, PNG ou WEBP.");
      resetInput();
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.warning("Imagem muito grande. Máximo permitido: 1MB.");
      resetInput();
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    onProfilePhotoChange(file);
  };

  const handleRemove = () => {
    setPreview("");
    onProfilePhotoChange(null);
    resetInput();
  };

  const resetInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  useEffect(() => {
    if (resetTrigger) {
      setPreview("");
      onProfilePhotoChange(null);
      resetInput();
    }
  }, [resetTrigger]);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">Foto de Perfil da Loja</p>

      <div className="flex gap-4 items-center">
        <input
          type="file"
          accept="image/jpeg, image/png, image/webp"
          className="hidden"
          id="store-avatar"
          ref={inputRef}
          onChange={handleFileChange}
        />

        <div className="relative">
          <label
            htmlFor="store-avatar"
            className="w-24 h-24 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:border-emerald-500 transition"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview do avatar da loja"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <i className="bi bi-upload text-2xl text-gray-400" />
            )}
          </label>

          {preview && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
            >
              <i className="bi bi-x text-xs" />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-500">JPG, PNG ou WEBP • Máx. 1MB</p>
          <p className="text-xs text-gray-400">
            Recomendado: 200×200px (quadrado)
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreAvatarUpload;
