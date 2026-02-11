import type { Product } from "../../../interfaces/Product";

interface ProductCardProps {
  thumbnail: string;
  product: Product;
  ProductSelected: React.Dispatch<React.SetStateAction<Product | null>>;
  disabled: boolean;
}

const ProductCard = ({
  product,
  thumbnail,
  disabled,
  ProductSelected,
}: ProductCardProps) => {
  const sizesFromVariants = product.variants.map((p) => p.size);
  const sizes = Array.from(new Set(sizesFromVariants));

  return (
    <div
      className={`
        group rounded-xl shadow-md 
        cursor-pointer relative 
        transition-all duration-300 
        ${
          disabled
            ? "opacity-50 pointer-events-none"
            : "hover:shadow-xl hover:-translate-y-1"
        }
      `}
      onClick={() => !disabled && ProductSelected(product)}
    >
     {!product.inStock && <p className="text-xs bg-red-500 text-white absolute z-10 top-2  px-4 py-1 rounded-xl right-2">
        Sem estoque
      </p>}
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <img
          src={thumbnail}
          alt="Imagem do produto"
          className="
            w-full 
            h-full 
            object-cover 
            transition-transform 
            duration-500 
            group-hover:scale-[1.03]
          "
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <p className="font-semibold text-xs">{product.name}</p>
        <p className="text-green-600 text-base font-semibold">
          R$ {product.price}
        </p>

        <div className="flex gap-2 text-xs text-gray-500">
          {sizes.map((size) => {
            return (
              <p key={size} className="bg-gray-200 rounded-md px-1 py-0.5 tsxt-xs">
                {size}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
