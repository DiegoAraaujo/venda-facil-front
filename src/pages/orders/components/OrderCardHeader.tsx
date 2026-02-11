import type { OrderStatus } from "../../../interfaces/order/order-status";
import { formatCurrency } from "../../../utils/formatCurrency";
import { formatDate } from "../../../utils/formatDate";

interface OrderCardHeaderProps {
  orderNumber: number;
  status: OrderStatus;
  date: string | Date;
  total: number;
}

const statusLabelMap: Record<OrderStatus, string> = {
  PENDING: "Aguardando",
  COMPLETED: "Confirmado",
  CANCELED: "Cancelado",
};

const OrderCardHeader = ({
  date,
  orderNumber,
  status,
  total,
}: OrderCardHeaderProps) => {
  const getStatusClasses = () => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-600";
      case "COMPLETED":
        return "bg-green-100 text-green-600";
      case "CANCELED":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };
  
  return (
    <div className="flex justify-between border-b border-gray-300 py-4">
      <div className="flex flex-col gap-1">
        <span className="flex gap-4">
          <p className="text-sm font-bold">#{orderNumber}</p>
          <p
            className={`flex gap-2 items-center text-xs px-2 py-1 rounded-xl ${getStatusClasses()}`}
          >
            {status === "PENDING" && <i className="bi bi-clock" />}
            {status === "COMPLETED" && <i className="bi bi-check2-circle" />}
            {status === "CANCELED" && <i className="bi bi-x-circle" />}
            {statusLabelMap[status]}
          </p>
        </span>
        <p className="text-gray-500 text-xs">{formatDate(date)}</p>
      </div>
      <p className=" font-bold text-emerald-600">{formatCurrency(total)}</p>
    </div>
  );
};

export default OrderCardHeader;
