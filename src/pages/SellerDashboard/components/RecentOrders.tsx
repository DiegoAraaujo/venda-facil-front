import { Link } from "react-router-dom";
import OrderItem from "./OrderItem";
import type { RecentOrder } from "../interface";
import EmptyState from "../../../components/EmptyState";
import NoOrders from "../../../assets/no-orders.png";
interface RecentOrdersProps {
  orders: RecentOrder[];
}

const RecentOrders = ({ orders }: RecentOrdersProps) => {
  return (
    <div className="rounded-xl border border-gray-300 p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="text-lg font-medium">Pedidos Recentes</p>
        <Link
          to="/"
          className="text-emerald-600 text-sm hover:bg-emerald-50 rounded-xl px-3 py-1"
        >
          Ver todos
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {orders.length > 0 ? (
          orders.map((o) => {
            return (
              <OrderItem
                customerName={o.client}
                itemCount={o.quantity}
                status={o.status}
                totalPrice={o.money}
              />
            );
          })
        ) : (
          <EmptyState
            title="Nenhum pedido encontrado"
            description="Ainda não há pedidos registrados para esta loja."
          >
            <img
              src={NoOrders}
              alt="Ilustração indicando que não há pedidos cadastrados"
              className="w-32 rounded-2xl"
            />
          </EmptyState>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;
