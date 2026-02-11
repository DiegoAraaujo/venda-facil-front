import api from "./api";

interface UpdateProductPayload {
  name: string;
  description: string;
  price: number;
  category_id: number;
  subcategory_id: number | null;
  variants: {
    id: number;
    stock: number;
    deleted_at: Date | null;
  }[];
}

export const createProduct = async (newProduct: FormData) => {
  try {
    const res = await api.post("/products", newProduct, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw new Error("Ocorreu um erro ao tentar criar o produto");
  }
};

export const getProducts = async (
  storeId: number,
  page: number,
  category?: number | null,
  subCategory?: number | null,

  perPage: number = 10,
) => {
  try {
    const params: { [key: string]: number } = {};

    if (storeId) params.storeId = storeId;
    if (category) params.category = category;
    if (subCategory) params.subcategory = subCategory;
    if (page) params.page = page;

    params.perPage = perPage;

    const res = await api.get("/products", { params });
    return res.data;
  } catch (error) {
    throw new Error("Ocorreu um erro ao buscar os produtos");
  }
};

export const getMyProducts = async (
  page: number,
  category?: number,
  productName?: string,
  perPage: number = 20,
) => {
  try {
    const params: {
      page?: number;
      perPage: number;
      category?: number;
      productName?: string;
    } = {
      page,
      perPage,
    };

    if (category !== undefined) {
      params.category = category;
    }

    if (productName && productName.trim() !== "") {
      params.productName = productName;
    }

    const res = await api.get("/products/me", { params });
    return res.data;
  } catch {
    throw new Error("Ocorreu um erro ao buscar os produtos da loja");
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    const res = await api.delete(`/products/${productId}`);
    return res.data;
  } catch (error) {
    throw new Error("Ocorreu um erro ao tentar deletar o produto");
  }
};

export const getProductCategories = async (productId: number) => {
  try {
    const res = await api.get(`/products/${productId}/categories`);
    return res.data;
  } catch {
    throw new Error("Ocorreu um erro ao buscar categorias do produto");
  }
};

export const updateProduct = async (
  productId: number,
  data: UpdateProductPayload,
) => {
  try {
    const res = await api.put(`/products/${productId}`, data);
    return res.data;
  } catch (error) {
    throw new Error("Ocorreu um erro ao tentar atualizar o produto");
  }
};
