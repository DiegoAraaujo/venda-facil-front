import { Link } from "react-router-dom";
import TopProductItem from "./TopProductItem";
import type { DashboardTopSellingProducts } from "../interface";
import EmptyState from "../../../components/EmptyState";
import NoSales from "../../../assets/no-sales.png";
interface TopProductsProps {
  products: DashboardTopSellingProducts[];
}
const TopProducts = ({ products }: TopProductsProps) => {
  return (
    <div className="rounded-xl border border-gray-300 p-4 flex flex-col gap-4 ">
      <div className="flex justify-between">
        <p className="text-lg font-medium">Produtos Mais Vendidos</p>
        <Link
          to="/"
          className="text-emerald-600 text-sm hover:bg-emerald-50 rounded-xl px-3 py-1"
        >
          Ver todos
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {products.length > 0 ? (
          products.map((p, index) => {
            return (
              <TopProductItem
                key={p.productId}
                productName={p.name}
                price={p.totalQuantitySold * p.totalRevenue}
                rank={index + 1}
                imageUrl={p.thumbnail}
                salesCount={p.totalQuantitySold}
              />
            );
          })
        ) : (
          <EmptyState
            title="Nenhuma venda registrada"
            description="Ainda não houve vendas nesta loja."
          >
            <img
              src={NoSales}
              alt="Ilustração indicando que não há vendas registradas"
              className="w-32 rounded-2xl"
            />
          </EmptyState>
        )}
      </div>
    </div>
  );
};

export default TopProducts;
