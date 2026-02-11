import { useState } from "react";
import type { Subcategory } from "../interface";
import SubcategoryItem from "./SubcategoryItem";
import { toast } from "sonner";
import { normalize } from "../../../utils/stringUtils";
import { motion } from "framer-motion";

interface ListItemBodyProps {
  categoryId: number;
  subcategories: Subcategory[];
  onDeleteSubcategory: (id: number) => void;
  onUpdateSubcategory: (id: number, newName: string) => void;
  onAddSubcategory: (categoryId: number, subcategories: string[]) => void;
}

const ListItemBody = ({
  categoryId,
  subcategories,
  onDeleteSubcategory,
  onUpdateSubcategory,
  onAddSubcategory,
}: ListItemBodyProps) => {
  const [subCategoriesInput, setSubcategoriesInput] = useState<string>("");

  const subCategoryRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ, ]*$/;

  const handleSubCategoriesChange = (value: string) => {
    if (subCategoryRegex.test(value)) setSubcategoriesInput(value);
  };

  const handleAddSubcategories = () => {
    if (!subCategoriesInput.trim()) {
      toast.warning("Informe ao menos uma subcategoria");
      return;
    }

    const subcategoriesArray = subCategoriesInput
      .split(",")
      .map((sc) => sc.trim())
      .filter(Boolean);

    if (!subcategoriesArray.length) {
      toast.warning("Não há subcategorias válidas para adicionar");
      return;
    }

    const normalizedInput = subcategoriesArray.map((sc) => normalize(sc));
    const normalizedExisting = new Set(
      subcategories.map((sc) => normalize(sc.name)),
    );

    const inputDuplicates = normalizedInput.filter(
      (sc, i) => normalizedInput.indexOf(sc) !== i,
    );

    if (inputDuplicates.length) {
      return toast.warning(
        "Você digitou subcategorias repetidas no input, corrija para continuar.",
      );
    }

    const existingDuplicates = subcategoriesArray.filter((sc) =>
      normalizedExisting.has(normalize(sc)),
    );

    if (existingDuplicates.length) {
      return toast.warning(
        `As seguintes subcategorias já existem: ${existingDuplicates.join(
          ", ",
        )}. Remova-as para continuar.`,
      );
    }

    onAddSubcategory(categoryId, subcategoriesArray);
    toast.success("Subcategorias adicionadas com sucesso");

    setSubcategoriesInput("");
  };

  return (
    <div className="flex flex-col border-t border-gray-500 p-4 gap-2">
      <span className="text-gray-500 text-sm">Subcategorias / Marcas</span>
      <motion.div
        className="flex gap-4 overflow-hidden"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <input
          onChange={(e) => handleSubCategoriesChange(e.target.value)}
          value={subCategoriesInput}
          type="text"
          placeholder="Ex: Nike, Adidas, Puma"
          className="text-sm rounded-xl border-gray-200 border px-4 py-1 flex-1"
        />
        <button
          onClick={handleAddSubcategories}
          className="text-white bg-emerald-500 rounded-xl px-2 py-1 cursor-pointer"
        >
          <i className="bi bi-plus" />
        </button>
      </motion.div>

      <div className="flex gap-2 flex-wrap">
        {subcategories.map((sc) => (
          <SubcategoryItem
            key={sc.id}
            onUpdateSubcategory={onUpdateSubcategory}
            subcategoryId={sc.id}
            subcategoryName={sc.name}
            onDeleteSubcategory={() => onDeleteSubcategory(sc.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListItemBody;
