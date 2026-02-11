import type { Categories, Product } from "../interface";
import SellerProductRow from "./SellerProductRow";

interface ProductsTableProps {
  products: Product[];
  categories: Categories[];
  onDeleteProduct: (productId: number) => void;
  onEditProduct: (product: Product | null) => void;
}

const ProductsTable = ({
  products,
  categories,
  onDeleteProduct,
  onEditProduct,
}: ProductsTableProps) => {
  return (
    <div className="rounded-xl border border-gray-300">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b text-gray-500 border-gray-300">
            <th className="w-20 px-2 py-3 text-left hidden md:table-cell">
              Foto
            </th>
            <th className="px-2 py-3 text-left">Produto</th>
            <th className="px-2 py-3 text-left hidden md:table-cell">
              Categoria
            </th>
            <th className="px-2 py-3 text-left">Preço</th>
            <th className="px-2 py-3 text-center hidden sm:table-cell">
              Estoque
            </th>
            <th className="w-16 px-2 py-3 text-right">Ações</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <SellerProductRow
              key={p.id}
              imageUrl={p.image}
              name={p.name}
              category={
                categories.find((c) => c.id === p.categoryId)?.name || ""
              }
              price={p.price}
              stock={p.stock}
              onDelete={() => onDeleteProduct(p.id)}
              onEditProduct={() => onEditProduct(p)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
