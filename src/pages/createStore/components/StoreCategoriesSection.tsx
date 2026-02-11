import React, { useState } from "react";
import SectionHeader from "../../../components/SectionHeader";
import TextInputField from "../../../components/TextInputField";
import CategoriesHelper from "./CategoriesHelper";
import type { Category } from "../interface";
import CategoryList from "./CategoryList";
import { toast } from "sonner";
import { normalize } from "../../../utils/stringUtils";

interface StoreCategoriesSectionProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const StoreCategoriesSection = ({
  categories,
  setCategories,
}: StoreCategoriesSectionProps) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string>("");

  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      toast.warning("Informe o nome da categoria");
      return;
    }
    const categoryAlreadyExists = categories.some(
      (c) => normalize(c.name) === normalize(categoryName),
    );

    if (categoryAlreadyExists) {
      toast.warning("Essa categoria já foi adicionada!");
      return;
    }

    const subcategoriesArray = subCategories
      .split(",")
      .map((sc) => sc.trim())
      .filter(Boolean);

    const normalizedSubs = subcategoriesArray.map((sc) => normalize(sc));
    const hasDuplicates =
      new Set(normalizedSubs).size !== normalizedSubs.length;

    if (hasDuplicates) {
      toast.warning(
        "Existem subcategorias duplicadas! Corrija antes de adicionar.",
      );
      return;
    }

    setCategories((prev) => [
      ...prev,
      {
        name: categoryName.trim(),
        subcategories: subcategoriesArray,
      },
    ]);

    setCategoryName("");
    setSubCategories("");
  };

  const categoryRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]*$/;
  const subCategoryRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ, ]*$/;

  const handleCategoryChange = (value: string) => {
    if (categoryRegex.test(value)) {
      setCategoryName(value);
    }
  };

  const handleSubCategoriesChange = (value: string) => {
    if (subCategoryRegex.test(value)) {
      setSubCategories(value);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader step={4} title="Categorias" />
      <CategoriesHelper />
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <i className="bi bi-tags text-emerald-600"></i>
          <p className="">Adicionar Categoria</p>
        </div>
        <TextInputField
          id="category"
          label="Nome da Categoria"
          placeHolder="Ex: calçados, Camisas, Acessórios..."
          type="text"
          value={categoryName}
          onChange={handleCategoryChange}
        />
        <div className="flex flex-col gap-1">
          <TextInputField
            id="sub-category"
            label="Subcategorias"
            placeHolder="Ex: Nike, Adidas (separe por vírgula)"
            type="text"
            value={subCategories}
            onChange={handleSubCategoriesChange}
          />
          <p className="text-xs text-gray-500">
            💡 Separe as subcategorias por virgula
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddCategory();
            }}
            className="border border-emerald-600 text-emerald-600 px-6 py-2 rounded-xl cursor-pointer hover:-translate-y-0.5 transition-transform duration-300"
          >
            Adicionar Categoria
          </button>
        </div>
      </div>
      {categories.length > 0 && (
        <CategoryList categories={categories} setCategories={setCategories} />
      )}
    </div>
  );
};

export default StoreCategoriesSection;
