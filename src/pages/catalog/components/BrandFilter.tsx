import { motion } from "framer-motion";
import BrandItem from "./BrandItem";
import type { SubCategories } from "../interface";

interface BrandFilterProps {
  subCategories: SubCategories[];
  subCategorySelected: number | null;
  setSubCategorySelected: React.Dispatch<React.SetStateAction<number | null>>;
}

const BrandFilter = ({
  subCategories,
  subCategorySelected,
  setSubCategorySelected,
}: BrandFilterProps) => {
  return (
    <motion.ul
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28 }}
      className="border-l-2 border-green-300 pl-4 h-12 flex overflow-x-auto no-scrollbar gap-4 items-center"
    >
      <BrandItem
        label="Ver Todas"
        value={null}
        isSelected={subCategorySelected === null}
        setSubCategorySelected={setSubCategorySelected}
      />

      {subCategories.map((brand) => (
        <BrandItem
          key={brand.id}
          label={brand.name}
          value={brand.id}
          isSelected={brand.id === subCategorySelected}
          setSubCategorySelected={setSubCategorySelected}
        />
      ))}
    </motion.ul>
  );
};

export default BrandFilter;
