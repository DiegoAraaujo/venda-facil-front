import type { OrderStatus } from "../../interfaces/order/order-status";

export interface RecentOrder {
  money: number;
  client: string;
  quantity: number;
  status: OrderStatus;
}

export interface DashboardSummary {
  totalSalesCount: number;
  outOfStockProductsCount: number;
  totalProductsCount: number;
  pendingOrdersCount: number;
}

export interface DashboardMetrics {
  totalOrders: number;
  completedOrders: number;
  totalRevenue: number;
  monthlyVisitsCount: number;
}

export interface DashboardTopSellingProducts {
  productId: number;
  name: string;
  thumbnail: string;
  totalQuantitySold: number;
  totalRevenue: number;
}
