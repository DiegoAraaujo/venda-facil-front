import { toast } from "sonner";
import type { OrderStatus } from "../../../interfaces/order/order-status";
import {
  removeOrderItem,
  updatePurchaseStatus,
} from "../../../services/purchasesService";
import type { Purchase, PurchaseItem } from "../interface";
import OrderItemCard from "./OrderItemCard";
import OrderCardHeader from "./OrderCardHeader";
import OrderCardCustomerInfo from "./OrderCardCustomerInfo";
import OrderCardActions from "./OrderCardActions";

interface OrderCardProps {
  orderNumber: number;
  selectedStatus: OrderStatus;
  date: string | Date;
  customerName: string;
  whatsapp: string;
  address: string | null;
  items: PurchaseItem[];
  onRemovePurchase: (id: number) => void;
  setPurchases: React.Dispatch<React.SetStateAction<Purchase[]>>;
}

const OrderCard = ({
  orderNumber,
  selectedStatus,
  date,
  customerName,
  whatsapp,
  address,
  items,
  onRemovePurchase,
  setPurchases,
}: OrderCardProps) => {
  const totalPrice = items.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleUpdatePurchaseStatus = async (
    purchaseId: number,
    status: OrderStatus,
  ) => {
    const hasOutOfStockItem = items.some((item) => !item.inStock);
    const hasInavaliabeItem = items.some((item) => !item.avaliable);

    if (hasOutOfStockItem && status !== "CANCELED") {
      toast.warning("Um ou mais itens do pedido estão sem estoque.");
      return;
    }
    if (hasInavaliabeItem && status !== "CANCELED") {
      toast.warning(
        "Um ou mais itens do pedido Não estao mais no catálogo da loja",
      );
      return;
    }

    try {
      await updatePurchaseStatus(purchaseId, status);
      onRemovePurchase(purchaseId);
      toast.success(
        `Pedido ${status === "COMPLETED" ? "confirmado" : "cancelado"} com sucesso!`,
      );
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const onRemoveItem = async (orderItemId: number) => {
    if (items.length > 1) {
      try {
        await removeOrderItem(orderItemId);
        setPurchases((prev) =>
          prev.map((p) =>
            p.id === orderNumber
              ? {
                  ...p,
                  items: p.items.filter((item) => item.id !== orderItemId),
                }
              : p,
          ),
        );

        toast.success("Item removido com sucesso!");
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    } else {
      toast.warning(
        "Você não pode remover este item porque ele é o único do pedido.",
      );
    }
  };

  return (
    <div className="border border-gray-300 rounded-xl flex flex-col gap-2 p-4">
      <OrderCardHeader
        orderNumber={orderNumber}
        status={selectedStatus}
        date={date}
        total={totalPrice}
      />

      <OrderCardCustomerInfo
        address={address}
        name={customerName}
        whatsapp={whatsapp}
      />

      <div className="flex flex-1 flex-col gap-2">
        <p className="text-sm font-medium">Itens do pedido</p>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto ">
          {items.map((item) => (
            <OrderItemCard
              key={item.id}
              imageUrl={item.image}
              name={item.productName}
              price={item.unitPrice}
              quantity={item.quantity}
              size={item.size}
              color={item.color}
              onRemoveItem={() => onRemoveItem(item.id)}
              status={selectedStatus}
              inStock={item.inStock}
              avaliable={item.avaliable}
            />
          ))}
        </div>
      </div>

      <OrderCardActions
        status={selectedStatus}
        onCancel={() => handleUpdatePurchaseStatus(orderNumber, "CANCELED")}
        onConfirm={() => handleUpdatePurchaseStatus(orderNumber, "COMPLETED")}
      />
    </div>
  );
};

export default OrderCard;
