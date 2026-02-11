import CategoryInfo from "./CategoryInfo";
import CategoryActions from "./CategoryActions";
import SubCategoriesList from "./SubCategoriesList";
import type { Category } from "../interface";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { normalize } from "../../../utils/stringUtils";

interface CategoryItemProps {
  category: Category;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryItem = ({ category, setCategories }: CategoryItemProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const removeCategory = () => {
    setCategories((prev) =>
      prev.filter((c) => normalize(c.value) !== normalize(category.value)),
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-t-xl">
        <CategoryInfo
          categoryName={category.value}
          numberSubcategories={category.subCategories.length}
        />
        <CategoryActions
          removeCategory={removeCategory}
          visible={visible}
          setVisible={setVisible}
        />
      </div>
      <AnimatePresence initial={false}>
        {visible && (
          <SubCategoriesList
            category={category}
            setCategories={setCategories}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryItem;
