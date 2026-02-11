import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";

interface StoreBannerUploadProps {
  onBannerChange: (value: File | null) => void;
  resetTrigger?: boolean;
}

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const StoreBannerUpload = ({
  onBannerChange,
  resetTrigger,
}: StoreBannerUploadProps) => {
  const [preview, setPreview] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const resetInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.warning("Formato inválido. Use JPG, PNG ou WEBP.");
      resetInput();
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.warning("Imagem muito grande. Máximo permitido: 3MB.");
      resetInput();
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    onBannerChange(file);
  };

  const handleRemove = () => {
    setPreview("");
    onBannerChange(null);
    resetInput();
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
      onBannerChange(null);
      resetInput();
    }
  }, [resetTrigger]);
  return (
    <div className="flex flex-col gap-2 relative">
      <p className="text-sm font-medium">Banner da Loja</p>

      <input
        type="file"
        id="banner"
        className="hidden"
        accept="image/jpeg, image/png, image/webp"
        ref={inputRef}
        onChange={handleFileChange}
      />

      {preview && (
        <button
          type="button"
          className="absolute top-5 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center"
          onClick={handleRemove}
        >
          <i className="bi bi-x text-xs" />
        </button>
      )}

      <label
        htmlFor="banner"
        className="w-full h-36 rounded-xl border-2 border-dashed border-gray-400 cursor-pointer hover:border-emerald-500 transition"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview do banner da loja"
            className="object-cover w-full h-full rounded-xl"
          />
        ) : (
          <div className="flex flex-col gap-1 items-center justify-center h-full text-center">
            <i className="bi bi-upload text-2xl text-gray-400" />
            <p className="text-sm text-gray-500">
              Clique para enviar uma imagem
            </p>
            <p className="text-xs text-gray-400">
              JPG, PNG ou WEBP • Máx. 3MB • 1200×400px
            </p>
          </div>
        )}
      </label>
    </div>
  );
};

export default StoreBannerUpload;
