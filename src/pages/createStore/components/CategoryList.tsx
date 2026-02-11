import type { Category } from "../interface";
import CategoryItem from "./CategoryItem";

interface CategoryListProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryList = ({ categories, setCategories }: CategoryListProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-500 text-sm">
        Suas Categorias ({categories.length})
      </p>

      <div className="flex flex-col gap-4">
        {categories.map((c) => {
          return <CategoryItem category={c} setCategories={setCategories} />;
        })}
      </div>
    </div>
  );
};

export default CategoryList;
