import type { Variant } from "../../../interfaces/Product";

interface ColorSelectorProps {
  productVariants: Variant[];
  colors: string[];
  selectedSize: string | null;
  selectedColor: string | null;
  setSelectedColor: React.Dispatch<React.SetStateAction<string | null>>;
}

const ColorSelector = ({
  colors,
  productVariants,
  selectedSize,
  selectedColor,
  setSelectedColor,
}: ColorSelectorProps) => {
  const isColorAvailable = (color: string) => {
    if (!selectedSize)
      return productVariants.some((v) => v.color === color && v.stock > 0);
    return productVariants.some(
      (v) => v.color === color && v.size === selectedSize && v.stock > 0
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm">Cor</p>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color}
            disabled={!isColorAvailable(color)}
            className={`rounded-full px-4 py-1 text-xs border transition
                  ${
                    selectedColor === color
                      ? "bg-green-500 text-white"
                      : "border-gray-300"
                  }
                  ${
                    !isColorAvailable(color)
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                `}
            onClick={() =>
              isColorAvailable(color) && selectedColor !== color
                ? setSelectedColor(color)
                : setSelectedColor(null)
            }
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
