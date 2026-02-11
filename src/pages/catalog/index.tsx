import { useEffect, useState } from "react";
import CategorySelector from "./components/CategorySelector";
import type { Category } from "./interface";
import BrandFilter from "./components/BrandFilter";
import { AnimatePresence } from "framer-motion";
import ProductDetailsModal from "./components/ProductDetailsModal";
import { getCategoriesByStore } from "../../services/categoryService";
import { toast } from "sonner";
import ProductsPagination from "../../components/Pagination";
import ProductsGrid from "./components/ProductGrid";
import { useStore } from "../../hooks/UseStore";
import type { Product } from "../../interfaces/Product";
import useProducts from "../../hooks/UseProducts";

const Catalog = () => {
  const { store } = useStore();

  const [page, setPage] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [subCategorySelected, setSubCategorySelected] = useState<number | null>(
    null,
  );
  const [productSelected, setProductSelected] = useState<Product | null>(null);

  if (!store) return null;

  const { products, paginationMeta, loading } = useProducts(
    store.id,
    page,
    categorySelected,
    subCategorySelected,
  );

  useEffect(() => {
    const fetchData  = async () => {
      try {
        const categories = await getCategoriesByStore(store.id);
        setCategories(categories);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };

    fetchData ();
  }, [store.id]);

  useEffect(() => {
    setSubCategorySelected(null);
    setPage(0);
  }, [categorySelected]);

  useEffect(() => {
    setPage(0);
  }, [subCategorySelected]);

  const selectedCategory = categories.find((el) => el.id === categorySelected);

  const subCategories = selectedCategory?.subcategories;

  return (
    <section className="w-full gap-4 flex flex-col flex-1 justify-between md:p-8 p-4">
      <div className="gap-4 flex flex-col flex-1">
        {categories.length > 0 && (
          <CategorySelector
            categories={categories}
            categorySelected={categorySelected}
            setCategorySelected={setCategorySelected}
          />
        )}
        <AnimatePresence>
          {subCategories && (
            <BrandFilter
              subCategories={subCategories}
              subCategorySelected={subCategorySelected}
              setSubCategorySelected={setSubCategorySelected}
            />
          )}
        </AnimatePresence>
        <ProductsGrid
          loading={loading}
          products={products}
          ProductSelected={setProductSelected}
        />
      </div>

      {paginationMeta &&
        (paginationMeta.hasNextPage || paginationMeta.hasPrevPage) && (
          <ProductsPagination
            total={paginationMeta.totalPages}
            page={page}
            setPage={setPage}
          />
        )}

      {productSelected && (
        <div
          className="fixed bg-black/40 w-full min-h-dvh inset-0 flex items-center justify-center p-6 z-40 backdrop-blur cursor-pointer"
          onClick={() => setProductSelected(null)}
        >
          <ProductDetailsModal
            productDetails={productSelected}
            closeModal={() => setProductSelected(null)}
          />
        </div>
      )}
    </section>
  );
};

export default Catalog;
