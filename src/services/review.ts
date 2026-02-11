import api from "./api";

export const getReviewStats = async (storeId: number) => {
  try {
    const res = await api.get(`/reviews/${storeId}/stats`);
    return res.data;
  } catch (error) {
    throw new Error("Erro ao buscar  estatisticas das reviews");
  }
};

export const getReviews = async (
  storeId: number,
  page: number,
  perPage: number = 10
) => {
  try {
    const params: { [key: string]: number } = {};

    if (storeId) params.storeId = storeId;
    if (page) params.page = page;

    params.perPage = perPage;

    const res = await api.get(`/reviews`, { params });
    return res.data;
  } catch (error) {
    throw new Error("Erro ao buscar reviews");
  }
};

export const createReview = async (storeId: number, review: FormData) => {
  try {
    const res = await api.post(`/reviews/${storeId}`, review, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Erro ao criar review");
  }
};

export const getLatestReviews = async (storeId: number) => {
  try {
    const res = await api.get(`/reviews/${storeId}/latest`);
    return res.data;
  } catch (error) {
    throw new Error("Erro ao buscar ultimas reviews reviews");
  }
};
