import { useEffect, useState } from "react";
import OrderCard from "./components/OrderCard";
import OrderStatusTabs from "./components/OrderStatusTabs";
import type { OrderStatus } from "../../interfaces/order/order-status";
import { getPurchases } from "../../services/purchasesService";
import { toast } from "sonner";
import type { Purchase } from "./interface";
import type { PaginationMeta } from "../../interfaces/paginationMeta";
import Pagination from "../../components/Pagination";
import OrderEmptyState from "./components/emptyStateMap";
import PageSkeleton from "../../components/PageSkeleton";

const SellerOrders = () => {
  const [statusFilter, setStatusFilter] = useState<OrderStatus>("PENDING");
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [page, setPage] = useState<number>(0);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const orders = await getPurchases(statusFilter, page + 1);
        setPurchases(orders.data);
        setPaginationMeta(orders.meta);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [statusFilter, page]);

  const removePendingPurchase = (id: number) => {
    setPurchases((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section className="p-4 md:p-8 flex flex-col gap-4 h-full flex-1">
      <div className="flex flex-col gap-4 flex-1">
        <OrderStatusTabs
          onChange={setStatusFilter}
          selectedStatus={statusFilter}
          orderCount={purchases.length}
        />

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <PageSkeleton message="Buscando dados" />
          </div>
        ) : purchases.length === 0 ? (
          <OrderEmptyState status={statusFilter} />
        ) : (
          <div className="grid 2xl:grid-cols-3 sm:grid-cols-2 gap-4">
            {purchases.map((p) => (
              <OrderCard
                key={p.id}
                address={p.address}
                customerName={p.buyerName}
                date={p.orderDate}
                orderNumber={p.id}
                selectedStatus={p.status}
                whatsapp={p.whatsApp}
                items={p.items}
                onRemovePurchase={removePendingPurchase}
                setPurchases={setPurchases}
              />
            ))}
          </div>
        )}
      </div>
      {paginationMeta &&
        (paginationMeta.hasNextPage || paginationMeta.hasPrevPage) && (
          <Pagination
            page={page}
            setPage={setPage}
            total={paginationMeta?.totalPages}
          />
        )}
    </section>
  );
};

export default SellerOrders;
