import axios from "axios";
import api from "./api";

export const createSubcategories = async (
  categoryId: number,
  subcategories: string[],
) => {
  try {
    const res = await api.post(`/categories/sub/${categoryId}`, {
      subcategories,
    });
    return res.data;
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Houve um problema, tente novamente");
  }
};

export const getSubCategoryById = async (categoryId: number) => {
  try {
    const res = await api.get(`/categories/sub/${categoryId}`);
    return res.data;
  } catch (error: unknown) {
    throw new Error(
      "Houve um problema ao tentar carregar subcategorias disponiveis",
    );
  }
};

export const deleteSubcategory = async (subcategoryId: number) => {
  try {
    const res = await api.delete(`/categories/sub/${subcategoryId}`);
    return res.data;
  } catch (error: unknown) {
    throw new Error(
      "Houve um problema ao tentar deletar a subcategoria, tente novamente",
    );
  }
};

export const updateSubCategory = async (
  subcategoryId: number,
  newName: string,
) => {
  try {
    const res = await api.patch(`/categories/sub/${subcategoryId}`, {
      newName,
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      throw new Error(
        "Escolha um nome diferente. Já existe uma subcategoria com esse nome.",
      );
    }

    throw new Error(
      "Houve um problema ao tentar atualizar a subcategoria, tente novamente",
    );
  }
};
