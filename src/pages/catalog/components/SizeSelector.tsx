import type { Variant } from "../../../interfaces/Product";

interface SizeSelectorProps {
  selectedColor: string | null;
  productVariants: Variant[];
  sizes: string[];
  setSelectedSize: React.Dispatch<React.SetStateAction<string | null>>;
  selectedSize: string | null;
}

const SizeSelector = ({
  selectedColor,
  productVariants,
  sizes,
  selectedSize,
  setSelectedSize,
}: SizeSelectorProps) => {
  
  const isSizeAvailable = (size: string) => {
    if (!selectedColor)
      return productVariants.some((v) => v.size === size && v.stock > 0);
    return productVariants.some(
      (v) => v.size === size && v.color === selectedColor && v.stock > 0
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm">Tamanho</p>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            disabled={!isSizeAvailable(size)}
            className={`rounded-full px-2 py-0.5 text-xs border transition
                  ${
                    selectedSize === size
                      ? "bg-green-500 text-white"
                      : "border-gray-300"
                  }
                  ${
                    !isSizeAvailable(size)
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                `}
            onClick={() =>
              isSizeAvailable(size) && selectedSize !== size
                ? setSelectedSize(size)
                : setSelectedSize(null)
            }
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
