export type SubCategories = {
  id: number;
  name: string;
};
export interface Category {
  id: number;
  name: string;
  subcategories: SubCategories[];
}

export type sizes = {
  size: string;
  quantity: number;
};

export interface ProductVariant {
  color: string;
  size: string;
  stock: number;
}

export interface ProductImage {
  url: string;
  isCover: boolean;
}

export interface Product {
  id: number;
  title: string;
  price: string;
  description: string;

  images: ProductImage[];

  variants: ProductVariant[];
}
export interface CartItemProduct {
  variantId: number;
  color: string | null;
  size: string;
  inStock: number;
  cartQuantity: number;
  available: boolean;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export interface SizeOption {
  size: string;
  inStock: boolean;
}

export interface ColorOption {
  color: string;
  inStock: boolean;
}
