import type { OrderStatus } from "../../../interfaces/order/order-status";

interface OrderStatusTabsProps {
  selectedStatus: OrderStatus;
  onChange: (value: OrderStatus) => void;
  orderCount: number;
}
const OrderStatusTabs = ({
  selectedStatus,
  onChange,
  orderCount,
}: OrderStatusTabsProps) => {
  return (
    <div className="grid grid-cols-3 bg-gray-100 rounded-xl px-2 py-1">
      <button
        onClick={() => onChange("PENDING")}
        className={`${selectedStatus === "PENDING" ? "bg-white" : "text-gray-500"} flex gap-2 justify-center px-2 py-1 rounded-xl text-sm cursor-pointer`}
      >
        Pendentes
        {selectedStatus === "PENDING" && (
          <span className="flex rounded-full w-5 h-5 text-xs bg-yellow-500 text-white justify-center items-center">
            {orderCount}
          </span>
        )}
      </button>
      <button
        onClick={() => onChange("COMPLETED")}
        className={`${selectedStatus === "COMPLETED" ? "bg-white" : "text-gray-500"}  px-2 py-1 rounded-xl text-sm cursor-pointer flex gap-2 justify-center`}
      >
        Vendas
        {selectedStatus === "COMPLETED" && (
          <span className="flex rounded-full w-5 h-5 text-xs bg-green-500 text-white justify-center items-center">
            {orderCount}
          </span>
        )}
      </button>
      <button
        onClick={() => onChange("CANCELED")}
        className={`${selectedStatus === "CANCELED" ? "bg-white" : "text-gray-500"}  px-2 py-1 rounded-xl text-sm cursor-pointer flex gap-2 justify-center`}
      >
        Cancelados
        {selectedStatus === "CANCELED" && (
          <span className="flex rounded-full w-5 h-5 text-xs bg-red-500 text-white justify-center items-center">
            {orderCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default OrderStatusTabs;
