import type { OrderStatus } from "../../../interfaces/order/order-status";
import EmptyState from "../../../components/EmptyState";
import CanceledOrders from "../../../assets/canceled-orders.png";
import noOrders from "../../../assets/no-orders.png";
import noSales from "../../../assets/no-sales.png";

const emptyStateMap: Record<
  OrderStatus,
  {
    title: string;
    description: string;
    image: string;
    alt: string;
  }
> = {
  PENDING: {
    title: "Nenhum pedido encontrado",
    description: "Ainda não há pedidos registrados para esta loja.",
    image: noOrders,
    alt: "Ilustração indicando que não há pedidos cadastrados",
  },
  COMPLETED: {
    title: "Nenhuma venda registrada",
    description: "Ainda não houve vendas nesta loja.",
    image: noSales,
    alt: "Ilustração indicando que não há vendas registradas",
  },
  CANCELED: {
    title: "Nenhum pedido cancelado",
    description: "Não há pedidos cancelados no momento.",
    image: CanceledOrders,
    alt: "Ilustração indicando que não há pedidos cancelados",
  },
};

interface OrderEmptyStateProps {
  status: OrderStatus;
}

const OrderEmptyState = ({ status }: OrderEmptyStateProps) => {
  const { title, description, image, alt } = emptyStateMap[status];

  return (
    <EmptyState title={title} description={description}>
      <img src={image} alt={alt} className="w-52 rounded-2xl" />
    </EmptyState>
  );
};

export default OrderEmptyState;
