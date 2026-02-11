import { useEffect, useState } from "react";
import TextInputField from "../../components/TextInputField";
import CategoriesHelper from "../createStore/components/CategoriesHelper";
import { toast } from "sonner";
import { normalize } from "../../utils/stringUtils";
import type { CategoryWithSubcategories } from "./interface";
import {
  createCategories,
  getMyCategories,
} from "../../services/categoryService";
import CategoriesList from "./components/CategoriesList";
import Button from "../../components/Button";
import PageSkeleton from "../../components/PageSkeleton";

const Categories = () => {
  const [categories, setCategories] = useState<CategoryWithSubcategories[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);

  const categoryRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]*$/;
  const subCategoryRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ, ]*$/;

  const handleCategoryChange = (value: string) => {
    if (categoryRegex.test(value)) setCategoryName(value);
  };

  const handleSubCategoriesChange = (value: string) => {
    if (subCategoryRegex.test(value)) setSubCategories(value);
  };

  const handleAddCategory = async () => {
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

    try {
      setLoading(true);
      const data = await createCategories({
        name: categoryName,
        subcategories: subcategoriesArray,
      });
      setCategories((prev) => [...prev, data]);
      toast.success(
        `${categoryName} e suas subcatgeorias adionados com sucesso`,
      );
      setCategoryName("");
      setSubCategories("");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingCategories(true);
        const categories = await getMyCategories();
        setCategories(categories);
      } catch (error) {
        if (error instanceof Error) return toast.error(error.message);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchData();
  }, []);

  if (loadingCategories) {
    return (
      <section className="w-full p-4 md:p-8 h-full flex items-center justify-center ">
        <PageSkeleton message="Buscando categorias..." />
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-8 p-4 md:p-8 ">
      <CategoriesHelper />
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <i className="bi bi-tags text-emerald-600"></i>
          <p className="">Adicionar Categoria</p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <TextInputField
            id="category"
            label="Nome da Categoria"
            placeHolder="Ex: calçados, Camisas, Acessórios..."
            type="text"
            value={categoryName}
            onChange={handleCategoryChange}
          />
          <div className="flex flex-col gap-1 flex-1">
            <TextInputField
              id="sub-category"
              label="Subcategorias"
              placeHolder="Ex: Nike, Adidas (separe por vírgula)"
              type="text"
              value={subCategories}
              onChange={handleSubCategoriesChange}
            />
            <p className="text-xs text-gray-500">
              💡 Separe as subcategorias por vírgula
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              handleAddCategory();
            }}
            isLoading={loading}
            loadingText="Adicionando Categoria"
          >
            Adicionar Categoria
          </Button>
        </div>

        <CategoriesList categories={categories} setCategories={setCategories} />
      </div>
    </section>
  );
};

export default Categories;
