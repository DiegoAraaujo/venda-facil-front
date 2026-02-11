export interface Categories {
  id: number;
  name: string;
  subcategories: Subcategories[];
}

export interface Subcategories {
  id: number;
  name: string;
}

export interface ProductVariant {
  id: number;
  color: string;
  size: string;
  stock: number;
  deleted_at?: Date | null;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
  subcategoryId: number;
  variants: ProductVariant[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
