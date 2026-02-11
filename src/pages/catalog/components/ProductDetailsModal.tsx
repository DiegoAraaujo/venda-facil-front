import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../../hooks/UseCart";
import { toast } from "sonner";
import type { Product } from "../../../interfaces/Product";
import { formatCurrency } from "../../../utils/formatCurrency";

interface ProductDetailsModalProps {
  productDetails: Product;
  closeModal: () => void;
}

const ProductDetailsModal = ({
  productDetails,
  closeModal,
}: ProductDetailsModalProps) => {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [stock, setStock] = useState<number | null>(null);
  const { setCartProducts, cartProducts } = useCart();

  useEffect(() => {
    setSelectedQuantity(1);

    const hasColors = productDetails.variants.some((v) => v.color !== null);

    let filteredVariants = productDetails.variants;

    if (hasColors && selectedColor) {
      filteredVariants = filteredVariants.filter(
        (v) => v.color === selectedColor,
      );
    }

    if (selectedSize) {
      filteredVariants = filteredVariants.filter(
        (v) => v.size === selectedSize,
      );
    }

    const totalStock = filteredVariants.reduce((acc, v) => acc + v.stock, 0);
    setStock(totalStock);
  }, [selectedSize, selectedColor, productDetails.variants]);

  const addToCart = () => {
    if (!selectedSize) toast.error("Selecione um tamanho");
    if (!selectedColor && colors.length > 0) toast.error("Selecione  uma cor");
    if (selectedQuantity <= 0) toast.error("A quantidade minima é 1");

    const selectedVariant = productDetails.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize,
    );

    if (!selectedVariant) return null;

    const alreadyInCart = cartProducts.some(
      (ct) => ct.variantId === selectedVariant.id,
    );

    if (alreadyInCart) {
      return toast.info("Você já adicionou esse produto ao carrinho");
    }
    setCartProducts((prev) => [
      ...prev,
      {
        quantity: selectedQuantity,
        productid: productDetails.id,
        variantId: selectedVariant.id,
      },
    ]);
    toast.success("Produto adicionado ao carrinho");
  };

  const sizes = Array.from(new Set(productDetails.variants.map((p) => p.size)));
  const colors = Array.from(
    new Set(
      productDetails.variants.map((p) => p.color).filter((v) => v !== null),
    ),
  );

  return (
    <div
      className="bg-white w-full max-w-xl h-150 rounded-xl overflow-y-auto no-scrollbar border border-white lg:max-w-4xl lg:grid lg:grid-cols-2 lg:h-125 lg:gap-4 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-2 right-2 rounded-full w-8 h-8 bg-white/80 z-10 justify-center items-center flex hover:-translate-y-0.5 hover:bg-white cursor-pointer transition-all duration-200"
        onClick={closeModal}
      >
        <i className="bi bi-x-lg text-lg" />
      </button>

      <div className="lg:flex lg:items-center lg:p-4">
        <Carousel productDetails={productDetails} />
      </div>

      <div className="flex flex-col justify-between p-4 gap-3">
        <div className="flex flex-col gap-3">
          <p className="text-xl font-semibold">{productDetails.name}</p>
          <p className="text-green-600 font-semibold md:text-3xl text-2xl">
            {formatCurrency(productDetails.price)}
          </p>
          <p className="text-gray-500 text-sm">{stock} em estoque</p>
          <p className="text-gray-500 text-sm">{productDetails.description}</p>
          <SizeSelector
            productVariants={productDetails.variants}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            sizes={sizes}
          />
          {colors.length >= 1 && (
            <ColorSelector
              colors={colors}
              productVariants={productDetails.variants}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              setSelectedColor={setSelectedColor}
            />
          )}
          {stock !== null && stock > 0 && (
            <QuantitySelector
              selectedQuantity={selectedQuantity}
              setSelectedQuantity={setSelectedQuantity}
              stock={stock}
            />
          )}
        </div>

        <button
          disabled={stock === 0}
          onClick={addToCart}
          className={`p-3 rounded-xl font-medium transition-transform duration-300
              ${
                stock === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white cursor-pointer hover:-translate-y-0.5 hover:bg-green-700"
              }
            `}
        >
          {stock === 0 ? "Produto esgotado" : "Adicionar ao Carrinho"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
