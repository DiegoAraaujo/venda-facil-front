import SummaryItem from "./SummaryItem";
import type { DashboardSummary } from "../interface";

interface QuickSummaryProps {
  summary: DashboardSummary | null;
}
const QuickSummary = ({ summary }: QuickSummaryProps) => {
  if (!summary) return null;
  return (
    <div className="rounded-xl border border-gray-300 p-4 flex flex-col gap-4">
      <p className="text-lg font-medium">Resumo Rápido</p>
      <div className="flex flex-col gap-4">
        <SummaryItem
          label="Pedidos pendentes"
          icon="bi-clock"
          color="#F59E0B"
          value={summary.pendingOrdersCount}
        />
        <SummaryItem
          label="Confirmados"
          icon="bi-check2-circle"
          color="green"
          value={summary.totalSalesCount}
        />
        <SummaryItem
          label="Produtos"
          icon="bi-box-seam"
          color="blue"
          value={summary.totalProductsCount}
        />
        <SummaryItem
          label="Sem estoque"
          icon="bi-exclamation-triangle"
          color="red"
          value={summary.outOfStockProductsCount}
        />
      </div>
    </div>
  );
};

export default QuickSummary;
