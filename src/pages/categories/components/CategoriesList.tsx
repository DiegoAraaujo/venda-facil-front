import { toast } from "sonner";
import {
  deleteCategory,
  updateCategory,
} from "../../../services/categoryService";
import {
  createSubcategories,
  deleteSubcategory,
  updateSubCategory,
} from "../../../services/subcategoryService";
import type { CategoryWithSubcategories } from "../interface";
import ListItem from "./ListItem";

interface CategoriesListProps {
  categories: CategoryWithSubcategories[];
  setCategories: React.Dispatch<
    React.SetStateAction<CategoryWithSubcategories[]>
  >;
}

const CategoriesList = ({ categories, setCategories }: CategoriesListProps) => {
  const onDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const onDeleteSubcategory = async (id: number) => {
    try {
      await deleteSubcategory(id);

      setCategories((prev) =>
        prev.map((category) => ({
          ...category,
          subcategories: category.subcategories.filter((sub) => sub.id !== id),
        })),
      );
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const onUpdateCategory = async (id: number, newName: string) => {
    try {
      await updateCategory(id, newName);

      setCategories((prev) =>
        prev.map((category) =>
          category.id === id ? { ...category, name: newName } : category,
        ),
      );
      toast.success("Nome da categoria atualizado com sucesso");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const onUpdateSubcategory = async (id: number, newName: string) => {
    try {
      await updateSubCategory(id, newName);

      setCategories((prevCategories) =>
        prevCategories.map((category) => ({
          ...category,
          subcategories: category.subcategories.map((sub) =>
            sub.id === id ? { ...sub, name: newName } : sub,
          ),
        })),
      );

      toast.success("Nome da subcategoria atualizado com sucesso");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };
  const onAddSubcategory = async (id: number, subcategories: string[]) => {
    try {
      const data = await createSubcategories(id, subcategories);
      if (data.failed.length > 0) {
        toast.warning(
          `As subcategorias já existentes não foram adicionadas: ${data.failed.join(", ")}.`,
        );
      }
      setCategories((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                subcategories: [...c.subcategories, ...data.created],
              }
            : c,
        ),
      );
      
      toast.success("Subcategorias adicionadas com sucesso");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {categories.map((c) => {
        return (
          <ListItem
            key={c.id}
            categoryId={c.id}
            categoryName={c.name}
            subCategories={c.subcategories}
            onDeleteCategory={onDeleteCategory}
            onDeleteSubcategory={onDeleteSubcategory}
            onUpdateCategory={onUpdateCategory}
            onUpdateSubcategory={onUpdateSubcategory}
            onAddSubcategory={onAddSubcategory}
          />
        );
      })}
    </div>
  );
};

export default CategoriesList;
