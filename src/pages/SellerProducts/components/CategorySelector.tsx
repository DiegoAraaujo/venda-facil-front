import type { Categories } from "../interface";

interface CategorySelectorProps {
  categories: Categories[];
  selectedCategory: number;
  selectedSubcategory: number | null;
  onChangeCategory: (id: number) => void;
  onChangeSubcategory: (id: number | null) => void;
}

const CategorySelector = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  onChangeCategory,
  onChangeSubcategory,
}: CategorySelectorProps) => {
  const subcategories =
    categories.find((c) => c.id === selectedCategory)?.subcategories ?? [];

  return (
    <div className="flex gap-4 flex-1">
      <div className="text-sm flex flex-col gap-2 flex-1">
        <label htmlFor="categories">Categoria</label>
        <select
          id="categories"
          value={selectedCategory}
          className="border border-gray-300 rounded-lg py-2 text-sm px-4"
          onChange={(e) => onChangeCategory(Number(e.target.value))}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="text-sm flex flex-col gap-2 flex-1">
        <label htmlFor="subcategories">Subcategoria</label>
        <select
          id="subcategories"
          value={selectedSubcategory ?? ""}
          disabled={subcategories.length === 0}
          className="border border-gray-300 rounded-lg py-2 text-sm px-4 disabled:bg-gray-100 disabled:cursor-not-allowed"
          onChange={(e) =>
            onChangeSubcategory(e.target.value ? Number(e.target.value) : null)
          }
        >
          {subcategories.length === 0 ? (
            <option value="">Sem subcategoria</option>
          ) : (
            subcategories.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.name}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
};
export default CategorySelector;
