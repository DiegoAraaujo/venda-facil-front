import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteProduct, getMyProducts } from "../../services/product";
import { getMyCategories } from "../../services/categoryService";
import type { Categories, PaginationMeta, Product } from "./interface";
import Pagination from "../../components/Pagination";
import PageSkeleton from "../../components/PageSkeleton";
import useDebounce from "../../hooks/UseDebounce";
import EditProductModal from "./components/EditProductModal";
import ProductsFilters from "./components/ProductsFilters";
import ProductsTable from "./components/ProductsTable";
import NoProducts from "../../assets/no-products.png";
import { toast } from "sonner";
import EmptyState from "../../components/EmptyState";

const SellerProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [page, setPage] = useState<number>(0);
  const [selectedCategory, setSelectedCatgeory] = useState<number | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(
    null,
  );
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedProductName = useDebounce(productName, 600);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getMyCategories();
        setCategories(categories);
      } catch (error) {
        if (error instanceof Error) return toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const products = await getMyProducts(
          page + 1,
          selectedCategory ?? undefined,
          debouncedProductName.trim(),
        );
        setProducts(products.data);
        setPaginationMeta(products.meta);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, selectedCategory, debouncedProductName]);

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      toast.success("Produto excluido com sucesso!");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const selectProductForEdit = (product: Product | null) => {
    setProductToEdit(product);
  };

  return (
    <section className="p-4 md:p-8 flex flex-col gap-8 flex-1">
      <div className="flex flex-col gap-8 flex-1">
        <ProductsFilters
          productName={productName}
          onProductNameChange={(value) => {
            setPage(0);
            setProductName(value);
          }}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(value) => {
            setPage(0);
            setSelectedCatgeory(value);
          }}
          onCreateProduct={() => navigate("/seller/new-product")}
        />

        {loading && products.length === 0 && (
          <section className="h-full flex items-center justify-center">
            <PageSkeleton message="Buscando seus produtos..." />
          </section>
        )}

        {!loading && products.length === 0 && (
          <EmptyState
            title="Nenhum produto cadastrado"
            description="A loja não possui produtos cadastrados até o momento!"
            buttonText="Criar primeiro produto"
            onButtonClick={() => navigate("/seller/new-product")}
          >
            <img
              src={NoProducts}
              alt="Nenhum produto disponível"
              className="w-52 rounded-2xl"
            />
          </EmptyState>
        )}

        {products.length > 0 && (
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-xl">
                <PageSkeleton message="Atualizando produtos..." />
              </div>
            )}

            <div
              className={`transition-opacity ${
                loading ? "opacity-50 pointer-events-none" : "opacity-100"
              }`}
            >
              <ProductsTable
                products={products}
                categories={categories}
                onDeleteProduct={handleDeleteProduct}
                onEditProduct={selectProductForEdit}
              />
            </div>
          </div>
        )}
      </div>

      {paginationMeta &&
        !loading &&
        (paginationMeta.hasNextPage || paginationMeta.hasPrevPage) && (
          <Pagination
            page={page}
            setPage={setPage}
            total={paginationMeta.totalPages}
          />
        )}

      {productToEdit && (
        <div className="fixed bg-black/40 w-full min-h-dvh inset-0 flex items-center justify-center p-6 z-50 backdrop-blur cursor-pointer">
          <EditProductModal
            onCancel={() => selectProductForEdit(null)}
            product={productToEdit}
            categories={categories}
            onUpdateProduct={(updatedProduct) => {
              setProducts((prev) =>
                prev.map((p) =>
                  p.id === updatedProduct.id ? updatedProduct : p,
                ),
              );
            }}
          />
        </div>
      )}
    </section>
  );
};

export default SellerProducts;
