import api from "./api";
import axios from "axios";

export const createStore = async (storeData: FormData) => {
  try {
    const res = await api.post(`/stores/`, storeData);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      if (error.response.data.field === "email")
        throw new Error("Este e-mail já está em uso.");
      if (error.response.data.field === "name")
        throw new Error("Já existe uma loja com esse nome.");

      throw new Error("Já existe um cadastro com esses dados.");
    }

    throw new Error("Houve um problema, tente novamente");
  }
};

export const signInStore = async (email: string, password: string) => {
  try {
    const res = await api.post(`/stores/login`, { email, password });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("Email ou senha incorretos");
    }
    throw new Error("Houve um problema, tente novamente");
  }
};

export const getStorePreviewByName = async (storeName: string) => {
  try {
    const res = await api.get(
      `/stores/preview/${encodeURIComponent(storeName)}`,
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error(`Não encontramos nenhuma loja chamada ${storeName}`);
    }
    throw new Error("Houve um problema, tente novamente");
  }
};

export const getStoreById = async (storeId: number) => {
  try {
    const res = await api.get(`/stores/${storeId}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error(`Houve um porbelma ao tentar acessar a loja`);
    }
    throw new Error("Houve um problema, tente novamente");
  }
};

export const getStoreStatus = async (storeID: number) => {
  try {
    const res = await api.get(`/stores/${storeID}/status`);
    return res.data;
  } catch (error: unknown) {
    throw new Error("Houve um problema ao tentar carregar status da loja");
  }
};

export const registerStoreVisit = async (storeID: number) => {
  try {
    const res = await api.post(`/stores/${storeID}/visits`);
    return res.data;
  } catch (error: unknown) {
    throw new Error("Houve um problema ao tentar registrar a visita da loja");
  }
};

export const getCartProducts = async (
  items: {
    quantity: number;
    productid: number;
    variantId: number;
  }[],
) => {
  try {
    const res = await api.post(`/cart`, { items });
    return res.data;
  } catch (error: unknown) {
    throw new Error(
      "Houve um problema ao tentar recuperar os items do carrinho",
    );
  }
};
