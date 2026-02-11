import { toast } from "sonner";
import type { Category, Subcategories } from "../interface";
import { useEffect, useState } from "react";
import { getMyCategories } from "../../../services/categoryService";
import { getSubCategoryById } from "../../../services/subcategoryService";
import SectionHeader from "../../../components/SectionHeader";
import { formatCentsInput } from "../../../utils/formatNumberInput";

interface ProductInfoFormProps {
  productName: string;
  setProductName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  categorySelected: number | null;
  setCategorySelected: React.Dispatch<React.SetStateAction<number | null>>;
  subCategorySelected: number | null;
  setSubcategorySelected: React.Dispatch<React.SetStateAction<number | null>>;
}

const ProductInfoForm = (props: ProductInfoFormProps) => {
  const [categories, setCategories] = useState<null | Category[]>(null);
  const [subCategories, setSubCategories] = useState<null | Subcategories[]>(
    null,
  );
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [loadingSubCategories, setLoadingSubCategories] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingCategories(true);
      try {
        const data= await getMyCategories();
        setCategories(data);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      setSubCategories(null);
      props.setSubcategorySelected(null);

      if (props.categorySelected === null) return;

      try {
        setLoadingSubCategories(true);
        const data: Subcategories[] = await getSubCategoryById(
          props.categorySelected,
        );
        setSubCategories(data);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      } finally {
        setLoadingSubCategories(false);
      }
    };
    fetchSubCategories();
  }, [props.categorySelected]);

  return (
    <div className="flex flex-col gap-8 w-full">
      <SectionHeader step={2} title="Informações do Produto" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="product-name" className="text-sm">
            Nome do produto *
          </label>
          <input
            id="product-name"
            value={props.productName}
            onChange={(e) => props.setProductName(e.target.value)}
            type="text"
            className="border border-gray-300 rounded-lg py-2 text-sm px-4"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm">
            Descrição
          </label>
          <textarea
            id="description"
            value={props.description}
            onChange={(e) => props.setDescription(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4 text-sm h-20"
            placeholder="Descreva o produto, materiais, características..."
            maxLength={200}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-sm">
            Preço *
          </label>
          <div className="w-full flex gap-4 border border-gray-300 rounded-lg py-2 px-4 ">
            <span className="text-gray-500 flex items-center px-2">R$</span>
            <input
              id="price"
              value={props.price}
              onChange={(e) => props.setPrice(formatCentsInput(e.target.value))}
              type="text"
              placeholder="0,00"
              className=" px-4 text-sm flex-1 focus:outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-sm">
              Categoria *
            </label>
            <select
              id="category"
              disabled={loadingCategories}
              value={props.categorySelected ?? ""}
              onChange={(e) =>
                props.setCategorySelected(Number(e.target.value))
              }
              className="border border-gray-300 rounded-lg py-2 px-4 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" disabled hidden>
                Selecione aqui
              </option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="subcategory" className="text-sm">
              Subcategoria
            </label>
            <select
              id="subcategory"
              value={props.subCategorySelected ?? ""}
              disabled={props.categorySelected === null || loadingSubCategories}
              onChange={(e) =>
                props.setSubcategorySelected(
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              className="border border-gray-300 rounded-lg py-2 px-4 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" disabled hidden>
                Selecione aqui
              </option>
              <option value="">Nenhuma</option>
              {subCategories?.map((sc) => (
                <option key={sc.id} value={sc.id}>
                  {sc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoForm;
