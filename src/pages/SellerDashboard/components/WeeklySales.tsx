import SalesOverviewChart from "./SalesOverviewChart";
import { formatCurrency } from "../../../utils/formatCurrency";

interface WeeklySalesProps {
  sales: number[];
  orders: number[];
}
const WeeklySales = ({ orders, sales }: WeeklySalesProps) => {
  const total = sales.reduce((acc, s) => acc + s, 0);

  return (
    <div className="rounded-xl border border-gray-300 bg-white p-4 shadow flex gap-5 flex-col">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Vendas da Semana</p>
          <p>Últimos 7 dias</p>
        </div>
        <p className="text-2xl font-semibold text-emerald-700">
          {formatCurrency(total)}
        </p>
      </div>
      <SalesOverviewChart orders={orders} sales={sales} />
    </div>
  );
};

export default WeeklySales;
