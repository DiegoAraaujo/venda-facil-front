import { toast } from "sonner";
import type { OrderStatus } from "../../../interfaces/order/order-status";
import { formatCurrency } from "../../../utils/formatCurrency";
import { confirmToast } from "../../categories/components/confirmDeleteCategory";

interface OrderItemCardProps {
  name: string;
  quantity: number;
  size: string;
  color: string | null;
  price: number;
  imageUrl: string | null;
  status: OrderStatus;
  inStock: boolean;
  avaliable: boolean;
  onRemoveItem: () => void;
}

const OrderItemCard = ({
  name,
  quantity,
  size,
  price,
  imageUrl,
  color,
  onRemoveItem,
  status,
  avaliable,
  inStock,
}: OrderItemCardProps) => {
  return (
    <div
      className={`${!inStock || !avaliable ? "border-dashed border-red-500 bg-red-50 text-red-900" : "border-gray-300"} flex gap-2  rounded-xl flex-col items-start border bg-gray-50 px-1 py-4 relative`}
    >
      <div className="flex gap-4">
        <div className="rounded-xl w-11 h-11">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover rounded-xl"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs">{name}</p>
          <p
            className={`${!inStock || !avaliable ? "text-red-900" : "text-gray-500"} text-xs `}
          >
            {quantity}x • {size} {color && <span>• {color}</span>}
          </p>
          <p className="font-semibold text-xs">{formatCurrency(price)}</p>
        </div>
      </div>

      {status === "PENDING" && (
        <button
          onClick={() =>
            confirmToast({
              title: "Deseja realmente excluir este item?",
              description: "essa ação nao podera ser desfeita!",
              confirmLabel: "Excluir",
              variant: "danger",
              onConfirm: () => {
                onRemoveItem();
                toast.success("Item Excluido com sucesso!");
              },
            })
          }
          className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-300 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:transform-none p-1 text-sm  text-red-500 flex px-2 py-0.5 rounded-xl absolute bottom-1 right-0 lg:text-sm"
        >
          <i className="bi bi-trash" />
        </button>
      )}
    </div>
  );
};

export default OrderItemCard;
