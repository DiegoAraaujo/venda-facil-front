import StatCard from "./StatCard";
import { formatCurrency } from "../../../utils/formatCurrency";
import type { DashboardMetrics } from "../interface";

interface DashboardStatsProps {
  metrics: DashboardMetrics | null;
}

const DashboardStats = ({ metrics }: DashboardStatsProps) => {
  if (!metrics) return null;
  
  return (
    <div className="grid md:grid-cols-4 gap-4 grid-cols-2">
      <StatCard
        icon={<i className="bi bi-cash-coin" />}
        value={formatCurrency(metrics.totalRevenue)}
        description="Faturamento mensal"
        bgColor="bg-green-100"
        textColor="text-green-600"
      />
      <StatCard
        icon={<i className="bi bi-bag" />}
        value={metrics.totalOrders}
        description="Pedidos no mês"
        bgColor="bg-blue-100"
        textColor="text-blue-600"
      />
      <StatCard
        icon={<i className="bi bi-check2-circle" />}
        value={metrics.completedOrders}
        description="Vendas no mês"
        bgColor="bg-yellow-100"
        textColor="text-yellow-600"
      />
      <StatCard
        icon={<i className="bi bi-people" />}
        value={metrics.monthlyVisitsCount}
        description="Acessos no mês"
        bgColor="bg-blue-50"
        textColor="text-blue-500"
      />
    </div>
  );
};

export default DashboardStats;
