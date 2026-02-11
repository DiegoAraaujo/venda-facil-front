interface ImagePreviewCardProps {
  src: string;
  onRemove: () => void;
  alt: string;
}

const ImagePreviewCard = ({ src, onRemove, alt }: ImagePreviewCardProps) => {
  return (
    <div className="aspect-square relative group hover:-translate-y-0.5 duration-300 transition-transform">
      <button
        type="button"
        className="absolute bg-red-400 rounded-full w-6 h-6 flex justify-center items-center hover:-translate-y-0.5 duration-300 transition-transform cursor-pointer top-2 right-2"
        onClick={onRemove}
      >
        <i className="bi bi-x text-xl text-white" />
      </button>

      <img src={src} alt={alt} className="object-cover h-full rounded-2xl" />
    </div>
  );
};

export default ImagePreviewCard;
