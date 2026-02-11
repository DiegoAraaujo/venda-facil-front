import type { OrderStatus } from "../../../interfaces/order/order-status";
import { formatCurrency } from "../../../utils/formatCurrency";

interface OrderItemProps {
  customerName: string;
  itemCount: number;
  totalPrice: number;
  status: OrderStatus;
}

const statusLabels = {
  COMPLETED: "Aprovado",
  PENDING: "Pendente",
  CANCELED: "Cancelado",
};

const OrderItem = ({
  customerName,
  itemCount,
  totalPrice,
  status,
}: OrderItemProps) => {
  return (
    <div className="flex gap-4 justify-between bg-gray-100 rounded-2xl px-4 py-2 cursor-pointer">
      <div className="flex gap-4 items-center">
        <i className="bi bi-bag text-xl text-yellow-600" />
        <span>
          <p className="text-sm font-medium">{customerName}</p>
          <p className="text-xs text-gray-500">{itemCount} itens</p>
        </span>
      </div>
      <div>
        <p className="text-emerald-600 font-semibold text-sm">
          R$ {formatCurrency(totalPrice)}
        </p>
        <p className="text-xs text-gray-500">{statusLabels[status]}</p>
      </div>
    </div>
  );
};

export default OrderItem;
