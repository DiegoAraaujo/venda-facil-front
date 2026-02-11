import { formatCurrency } from "../../../utils/formatCurrency";

interface OrderSummaryProps {
  total: number;
}
const OrderSummary = ({ total }: OrderSummaryProps) => (
  <div className="flex justify-between border border-emerald-300 rounded-xl px-4 py-2 items-center bg-emerald-50">
    <p className="text-gray-500 text-sm">Total do pedido</p>
    <p className="text-emerald-600 font-bold text-lg">
      {formatCurrency(total)}
    </p>
  </div>
);

export default OrderSummary;
