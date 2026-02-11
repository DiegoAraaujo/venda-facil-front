import api from "./api";

export const getWeeklyDashboard = async () => {
  try {
    const res = await api.get(`/purchases/dashboard/weekly`);
    return res.data;
  } catch (error) {
    throw new Error(
      "Ocorreu um problema ao carregar os dados da semana. Tente novamente.",
    );
  }
};

export const getMonthlyDashboard = async () => {
  try {
    const res = await api.get(`/purchases/stats/monthly`);
    return res.data;
  } catch (error) {
    throw new Error(
      "Ocorreu um problema ao carregar os dados desse mês. Tente novamente.",
    );
  }
};

export const getRecentOrders = async () => {
  try {
    const res = await api.get(`/purchases/lastest`);
    return res.data;
  } catch (error) {
    throw new Error(
      "Ocorreu um problema ao carregar os ultimos pedidos. Tente novamente.",
    );
  }
};

export const getDashboardSummary = async () => {
  try {
    const res = await api.get(`/purchases/summary`);
    return res.data;
  } catch (error) {
    throw new Error("Ocorreu um problema ao carregar resumo. Tente novamente.");
  }
};

export const getTopSellingProducts = async () => {
  try {
    const res = await api.get(`/products/top`);
    return res.data;
  } catch (error) {
    throw new Error(
      "Ocorreu um problema ao carregar produtos mais vendidos. Tente novamente.",
    );
  }
};
