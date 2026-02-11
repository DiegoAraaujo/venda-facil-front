import { useState } from "react";
import type { Subcategory } from "../interface";
import ListItemBody from "./ListItemBody";
import ListItemHeader from "./ListItemHeader";
import { AnimatePresence } from "framer-motion";

interface ListItemProps {
  categoryId: number;
  categoryName: string;
  subCategories: Subcategory[];
  onDeleteCategory: (id: number) => void;
  onDeleteSubcategory: (id: number) => void;
  onUpdateCategory: (id: number, newName: string) => void;
  onUpdateSubcategory: (id: number, newName: string) => void;
  onAddSubcategory: (categoryId: number, subcategories: string[]) => void;
}

const ListItem = ({
  categoryId,
  categoryName,
  subCategories,
  onDeleteCategory,
  onDeleteSubcategory,
  onUpdateCategory,
  onUpdateSubcategory,
  onAddSubcategory,
}: ListItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className=" max-w-xl m-auto w-full  border border-gray-300 rounded-xl">
      <ListItemHeader
        categoryId={categoryId}
        categoryName={categoryName}
        subCategoriescount={subCategories ? subCategories.length : 0}
        onToggleBody={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        onDelete={() => onDeleteCategory(categoryId)}
        onUpdateCategory={onUpdateCategory}
      />
      <AnimatePresence initial={false}>
        {isExpanded && (
          <ListItemBody
            categoryId={categoryId}
            onUpdateSubcategory={onUpdateSubcategory}
            subcategories={subCategories}
            onDeleteSubcategory={onDeleteSubcategory}
            onAddSubcategory={onAddSubcategory}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ListItem;
