import { useEffect, useState } from "react";
import { toast } from "sonner";

import DashboardStats from "./components/DashboardStats";
import WeeklySales from "./components/WeeklySales";
import QuickSummary from "./components/QuickSummary";
import RecentOrders from "./components/RecentOrders";
import TopProducts from "./components/TopProducts";

import type {
  DashboardMetrics,
  DashboardSummary,
  DashboardTopSellingProducts,
  RecentOrder,
} from "./interface";

import {
  getDashboardSummary,
  getMonthlyDashboard,
  getRecentOrders,
  getTopSellingProducts,
  getWeeklyDashboard,
} from "../../services/dashboard";
import PageSkeleton from "../../components/PageSkeleton";

const SellerDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState<DashboardMetrics | null>(
    null,
  );

  const [weeklyOrders, setWeeklyOrders] = useState<number[]>([]);
  const [weeklySales, setWeeklySales] = useState<number[]>([]);

  const [overviewSummary, setOverviewSummary] =
    useState<DashboardSummary | null>(null);

  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);

  const [topProducts, setTopProducts] = useState<DashboardTopSellingProducts[]>(
    [],
  );

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [
          monthlyStats,
          weeklyMetrics,
          summaryData,
          recentOrdersData,
          topProductsData,
        ] = await Promise.all([
          getMonthlyDashboard(),
          getWeeklyDashboard(),
          getDashboardSummary(),
          getRecentOrders(),
          getTopSellingProducts(),
        ]);

        setDashboardStats(monthlyStats);
        setOverviewSummary(summaryData);
        setRecentOrders(recentOrdersData);
        setTopProducts(topProductsData);

        setWeeklyOrders(weeklyMetrics.weeklyOrdersByDay);
        setWeeklySales(weeklyMetrics.weeklyRevenueByDay);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="w-full p-4 md:p-8 h-full flex items-center justify-center ">
        <PageSkeleton message="Preparando seu dashboard..." />
      </section>
    );
  }

  return (
    <section className="w-full p-4 md:p-8 flex flex-col gap-4">
      <DashboardStats metrics={dashboardStats} />

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr] lg:grid-cols-[1fr_300px]">
        <WeeklySales sales={weeklySales} orders={weeklyOrders} />
        <QuickSummary summary={overviewSummary} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <RecentOrders orders={recentOrders} />
        <TopProducts products={topProducts} />
      </div>
    </section>
  );
};

export default SellerDashboard;
