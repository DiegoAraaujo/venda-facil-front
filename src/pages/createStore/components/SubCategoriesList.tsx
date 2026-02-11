import React, { useState } from "react";
import type { Category } from "../interface";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { isValidSingleWord, normalize } from "../../../utils/stringUtils";

interface SubCategoriesListProps {
  category: Category;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const SubCategoriesList = ({
  category,
  setCategories,
}: SubCategoriesListProps) => {
  const [subcategory, setSubcategory] = useState<string>("");

  const addNewSubcategory = () => {
    if (!subcategory.trim()) {
      toast.warning("Informe o nome da subcategoria");
      return;
    }

    if (!isValidSingleWord(subcategory)) {
      toast.warning(
        "Subcategoria inválida. Use apenas letras, sem símbolos.",
      );
      return;
    }

    let added = false;

    setCategories((prev) =>
      prev.map((c) => {
        if (normalize(c.name) !== normalize(category.name)) return c;

        const normalizedSub = normalize(subcategory);

        if (c.subcategories.some((sc) => normalize(sc) === normalizedSub)) {
          toast.warning("Essa subcategoria já existe");
          return c;
        }

        added = true;

        return {
          ...c,
          subCategories: [...c.subcategories, subcategory.trim()],
        };
      }),
    );

    if (added) {
      toast.success("Subcategoria adicionada");
      setSubcategory("");
    }
  };

  const removeSubcategory = (subToRemove: string) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (normalize(c.name) !== normalize(category.name)) return c;

        return {
          ...c,
          subCategories: c.subcategories.filter(
            (sc) => normalize(sc) !== normalize(subToRemove),
          ),
        };
      }),
    );
  };

  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      exit={{ scaleY: 0, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.5,
      }}
      style={{ originY: 0 }}
      className="bg-gray-50 rounded-b-xl overflow-hidden p-4 flex flex-col gap-4"
    >
      <div className="flex gap-4">
        <input
          value={subcategory}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[A-Za-zÀ-ÖØ-öø-ÿ ]*$/.test(value)) setSubcategory(value);
          }}
          type="text"
          className="border border-gray-300 rounded-lg py-2 text-sm px-4 flex-1 focus:outline-none"
          placeholder="Adicionar subcategoria"
        />

        <button
          type="button"
          onClick={addNewSubcategory}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-3 py-1.5 cursor-pointer"
        >
          <i className="bi bi-plus text-xl" />
        </button>
      </div>

      {category.subcategories.length > 0 && (
        <ul className="border-l-2 border-emerald-200 flex flex-col gap-2">
          {category.subcategories.map((sb) => (
            <li
              key={sb}
              className="px-6 py-2 text-sm hover:bg-gray-100 rounded-xl group relative transition-colors duration-300"
            >
              <span>{sb}</span>
              <button
                type="button"
                className="hidden group-hover:inline-block absolute right-5 top-1 hover:text-red-600 cursor-pointer"
                onClick={() => removeSubcategory(sb)}
              >
                <i className=" bi bi-x text-xl" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default SubCategoriesList;
