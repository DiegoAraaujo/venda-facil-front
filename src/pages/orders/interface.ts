import type { OrderStatus } from "../../interfaces/order/order-status";

export interface PurchaseItem {
  id: number;
  variantId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  color: string | null;
  size: string;
  image: string | null;
  inStock: boolean;
  avaliable: boolean;
}

export interface Purchase {
  id: number;
  buyerName: string;
  whatsApp: string;
  address: string;
  orderDate: Date;
  status: OrderStatus;
  items: PurchaseItem[];
}
