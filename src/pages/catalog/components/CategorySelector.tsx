import type { Category } from "../interface";
import CategoryItem from "./CategoryItem";

interface CategorySelectorProps {
  categories: Category[];
  categorySelected: number | null;
  setCategorySelected: React.Dispatch<React.SetStateAction<number | null>>;
}

const CategorySelector = ({
  categories,
  categorySelected,
  setCategorySelected,
}: CategorySelectorProps) => {
  return (
    <ul className="flex gap-4 w-full overflow-x-auto no-scrollbar">
      <CategoryItem
        isSelected={categorySelected === null}
        label="Todos"
        value={null}
        setCategorySelected={setCategorySelected}
        hasFilters={false}
      />
      {categories.map((category) => {
        const isSelected = category.id === categorySelected;
        const hasFilters =
          !!category.subcategories && category.subcategories.length > 0;

        return (
          <CategoryItem
            key={category.id}
            isSelected={isSelected}
            label={category.name}
            value={category.id}
            setCategorySelected={setCategorySelected}
            hasFilters={hasFilters}
          />
        );
      })}
    </ul>
  );
};

export default CategorySelector;
