import axios from "axios";
import type { Category } from "../interfaces/category/CategoriesSimple";
import api from "./api";

export const createCategories = async (categories: Category) => {
  try {
    const res = await api.post(`/categories/`, categories);
    return res.data;
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Houve um problema, tente novamente");
  }
};

export const getCategoriesByStore = async (
  StoreId: number,
) => {
  try {
    const res = await api.get(`/categories/${StoreId}`);
    return res.data;
  } catch (error: unknown) {
    throw new Error(
      "Houve um problema ao tentar carregar categorias disponiveis",
    );
  }
};

export const getMyCategories = async () => {
  try {
    const res = await api.get("/categories/me");
    return res.data;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(
      "Houve um problema ao tentar carregar categorias disponiveis",
    );
  }
};

export const deleteCategory = async (categoryId: number) => {
  try {
    const res = await api.delete(`/categories/${categoryId}`);
    return res.data;
  } catch (error: unknown) {
    throw new Error(
      "Houve um problema ao tentar deletar a categoria, tente novamente",
    );
  }
};

export const updateCategory = async (categoryId: number, newName: string) => {
  try {
    const res = await api.patch(`/categories/${categoryId}`, { newName });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      throw new Error(
        "Escolha um nome diferente. Já existe uma categoria com esse nome.",
      );
    }

    throw new Error(
      "Houve um problema ao tentar atualizar a categoria, tente novamente",
    );
  }
};
