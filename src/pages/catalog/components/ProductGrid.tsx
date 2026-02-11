import ProductCard from "./ProductCard";
import NoProducts from "../../../assets/no-products.png";
import type { Product } from "../../../interfaces/Product";
import PageSkeleton from "../../../components/PageSkeleton";
import EmptyState from "../../../components/EmptyState";

interface ProductsGridProps {
  products: Product[];
  loading: boolean;
  ProductSelected: React.Dispatch<React.SetStateAction<Product | null>>;
}

const ProductsGrid = ({
  products,
  loading,
  ProductSelected,
}: ProductsGridProps) => {
  if (products.length === 0 && !loading) {
    return (
      <EmptyState
        title="Nenhum produto disponível"
        description="Parece que não temos itens no momento. Volte mais tarde para conferir nossas novidades!"
      >
        <img
          src={NoProducts}
          alt="Nenhum produto disponível"
          className="w-52 rounded-2xl"
        />
      </EmptyState>
    );
  }
  if (products.length === 0 && loading) {
    return <PageSkeleton message="Buscando Produtos da loja" />;
  }

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative`}
    >
      {products.map((product) => {
        const thumbnail =
          product.images.find((img) => img.is_cover) || product.images[0];

        return (
          <ProductCard
            key={product.id}
            product={product}
            thumbnail={thumbnail.url}
            ProductSelected={ProductSelected}
            disabled={loading}
          />
        );
      })}
    </div>
  );
};

export default ProductsGrid;
