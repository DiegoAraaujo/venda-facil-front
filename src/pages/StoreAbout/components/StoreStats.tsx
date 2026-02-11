import { useEffect, useState } from "react";
import type { StoreMetrics } from "../interface";
import StoreStatItem from "./StoreStatItem";
import { getStoreStatus } from "../../../services/store";
import { toast } from "sonner";
import DotLoader from "../../../components/DotLoader";

interface StoreStatsProps {
  storeId: number;
}
const StoreStats = ({ storeId }: StoreStatsProps) => {
  const [stats, setStats] = useState<null | StoreMetrics>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getStoreStatus(storeId);
        setStats(data);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [storeId]);

  const getStarIcon = (rating: number | null) => {
    if (rating === null) return "bi-star";
    if (rating >= 1 && rating < 2) return "bi-star-half";
    if (rating >= 2 && rating < 3) return "bi-star-half";
    if (rating >= 3 && rating < 4) return "bi-star-fill";
    if (rating >= 4 && rating < 5) return "bi-star-fill";
    if (rating === 5) return "bi-star-fill";
    return "bi-star";
  };

  if (loading) return <DotLoader message="Buscando estatisticas da loja" />;
  if (!stats)
    return (
      <p className="text-center text-gray-400">
        Não há estatísticas disponíveis
      </p>
    );
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StoreStatItem
        color="#16A34A"
        icon="bi bi-graph-up"
        label="Vendas"
        value={stats.salesCount}
      />
      <StoreStatItem
        color="#16A34A"
        icon="bi bi-bag"
        label="Produtos"
        value={stats.productCount}
      />
      <StoreStatItem
        color="#CA8A04"
        icon={`bi ${getStarIcon(stats.rating)}`}
        label="Estrelas"
        value={stats.rating === 0 ? 0 : stats.rating.toFixed(1)}
      />
      <StoreStatItem
        color="#CA8A04"
        icon="bi bi-people-fill"
        label="Já nos avaliaram"
        value={stats.reviewsCount}
      />
    </div>
  );
};

export default StoreStats;
