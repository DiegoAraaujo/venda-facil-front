import { useEffect, useState } from "react";
import { getProducts } from "../services/product";
import type { PaginationMeta, Product } from "../interfaces/Product";
import { toast } from "sonner";

const useProducts = (
  storeId: number,
  page: number,
  categoryId: number | null,
  subCategoryId: number | null,
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProducts(
          storeId,
          page + 1,
          categoryId,
          subCategoryId,
        );

        setProducts(res.data);
        setPaginationMeta(res.meta);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [storeId, page, categoryId, subCategoryId]);

  return { products, paginationMeta, loading };
};

export default useProducts;
