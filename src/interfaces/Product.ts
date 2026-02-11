export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  variants: Variant[];
  images: Image[];
  inStock: boolean;
}

export interface Variant {
  id: number;
  color: string | null;
  size: string;
  stock: number;
}

export interface Image {
  id: number;
  is_cover: boolean;
  url: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Subcategory {
  id: number;
  name: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProductsResponse {
  data: Product[];
  meta: PaginationMeta;
}
