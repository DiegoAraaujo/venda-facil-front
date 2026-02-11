import { useEffect, useState } from "react";
import { useCart } from "../../../hooks/UseCart";

interface CartItemProps {
  variantId: number;
  title: string;
  size: string;
  color: string | null;
  quantity: number;
  maxAvailableQuantity: number;

  price: number;
  image: string;
  onDelete: () => void;
}

const CartItem = ({
  variantId,
  title,
  size,
  color,
  quantity,
  price,
  image,
  onDelete,
  maxAvailableQuantity,
}: CartItemProps) => {
  const [editableQuantity, setEditableQuantity] = useState<number>(quantity);
  const { setCartProducts } = useCart();
  useEffect(() => {
    setCartProducts((prev) =>
      prev.map((p) =>
        p.variantId === variantId ? { ...p, quantity: editableQuantity } : p,
      ),
    );
  }, [editableQuantity]);

  return (
    <div className="flex gap-4 bg-gray-50 p-3 rounded-xl items-center">
      <div className="w-32 aspect-square">
        <img
          src={image}
          alt="product cover image"
          className="rounded-2xl object-cover h-full w-full"
        />
      </div>

      <div className="grow flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium">{title}</p>
          <p className="text-xs text-gray-500">
            Tam: {size} {color && <span>| Cor: {color}</span>}
          </p>
        </div>
        <p className="text-green-600 texts-sm font-semibold">R$ {price}</p>

        <div className="flex justify-between gap-2">
          <div className="flex rounded-xl  border border-gray-300 ">
            <button
              onClick={() =>
                setEditableQuantity((prev) => (prev > 1 ? prev - 1 : prev))
              }
              className={`text-xs px-2 rounded-l-xl transition
                    cursor-pointer hover:bg-gray-300`}
            >
              -
            </button>
            <p className="text-xs px-2 flex items-center">{editableQuantity}</p>
            <button
              onClick={() =>
                setEditableQuantity((prev) =>
                  prev < maxAvailableQuantity ? prev + 1 : prev,
                )
              }
              className={`text-xs  px-2 rounded-r-xl transition
                    cursor-pointer hover:bg-gray-300`}
            >
              +
            </button>
          </div>

          <i
            className="bi bi-trash text-red-700 bg-red-100 w-8 h-8 flex justify-center items-center rounded-xl hover:bg-red-200 cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
