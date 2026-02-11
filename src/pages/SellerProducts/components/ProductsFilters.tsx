import Button from "../../../components/Button";
import type { Categories } from "../interface";

interface ProductsFiltersProps {
  productName: string;
  onProductNameChange: (value: string) => void;

  categories: Categories[];
  selectedCategory: number | null;
  onCategoryChange: (value: number | null) => void;

  onCreateProduct: () => void;
}

const ProductsFilters = ({
  productName,
  onProductNameChange,
  categories,
  selectedCategory,
  onCategoryChange,
  onCreateProduct,
}: ProductsFiltersProps) => {
  return (
    <div className="flex gap-4 border border-gray-300 rounded-xl p-4 flex-col md:flex-row">
      <div className="border border-gray-300 rounded-xl px-2 py-2 flex gap-4 flex-1">
        <i className="bi bi-search text-gray-500 text-xl" />
        <input
          value={productName}
          onChange={(e) => onProductNameChange(e.target.value)}
          type="text"
          placeholder="Buscar Produtos..."
          className="flex-1 focus:outline-0"
        />
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <select
          value={selectedCategory ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            onCategoryChange(value === "" ? null : Number(value));
          }}
          className="border border-emerald-600 rounded-xl p-1 px-2 text-emerald-600"
        >
          <option value="">Todas as categorias</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <Button onClick={onCreateProduct}>
          <i className="bi bi-plus" /> Novo Produto
        </Button>
      </div>
    </div>
  );
};

export default ProductsFilters;
