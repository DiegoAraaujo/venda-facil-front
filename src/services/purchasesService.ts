import axios from "axios";
import type { OrderStatus } from "../interfaces/order/order-status";
import api from "./api";

export const getPurchases = async (
  status: OrderStatus,
  page: number,
  perPage: number = 10,
) => {
  try {
    const res = await api.get(`/purchases/${status}`, {
      params: { page, perPage },
    });
    return res.data;
  } catch (error) {
    throw new Error(
      "Ocorreu um problema ao carregar os Pedidos. Tente novamente.",
    );
  }
};

export const updatePurchaseStatus = async (
  purchaseId: number,
  status: OrderStatus,
) => {
  try {
    const res = await api.patch(`/purchases/${purchaseId}`, { status });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.data.outOfStockItems?.length) {
        throw new Error(
          "Alguns itens do pedido estão sem estoque. Atualize o pedido.",
        );
      }
    }

    throw new Error("Ocorreu um erro ao atualizar o status do pedido.");
  }
};

export const removeOrderItem = async (orderItemId: number) => {
  try {
    const res = await api.delete(`/purchases/items/${orderItemId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Ocorreu um erro ao deletar item do pedido.");
  }
};

interface PurchaseData {
  full_name: string;
  address: string;
  whatsApp: string;
  items: {
    variantId: number;
    quantity: number;
  }[];
}

export const createPurchase = async (
  storeId: number,
  purchaseData: PurchaseData,
) => {
  try {
    const res = await api.post(`/purchases/${storeId}`, purchaseData);
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error("Ouve um problema ao fazer o pedido. Tente Novamente!");
    }
    throw error;
  }
};
