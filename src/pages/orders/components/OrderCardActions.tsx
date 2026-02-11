import type { OrderStatus } from "../../../interfaces/order/order-status";

interface OrderCardActionsProps {
  status: OrderStatus;
  onConfirm: () => void;
  onCancel: () => void;
}

const OrderCardActions = ({
  status,
  onConfirm,
  onCancel,
}: OrderCardActionsProps) => {
  return (
    <div className="flex flex-col gap-2">
      {status === "PENDING" && (
        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            className="bg-emerald-600 flex-1 text-white p-2 rounded-xl text-sm"
          >
            Confirmar
          </button>

          <button
            onClick={onCancel}
            className="bg-red-600 text-white p-2 rounded-xl text-sm"
          >
            Negar Pedido
          </button>
        </div>
      )}

      <button className="bg-emerald-100 p-2 rounded-xl text-sm text-green-600">
        WhatsApp
      </button>
    </div>
  );
};

export default OrderCardActions;
