import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import TextInputField from "../../../components/TextInputField";
import type { Categories, Product, ProductVariant } from "../interface";
import { formatCentsInput } from "../../../utils/formatNumberInput";
import VariantsTable from "./VariantsTable";
import CategorySelector from "./CategorySelector";
import ProductInfo from "./ProductInfo";
import { updateProduct } from "../../../services/product";
import { toast } from "sonner";

interface EditProductModalProps {
  product: Product;
  categories: Categories[];
  onCancel: () => void;
  onUpdateProduct: (updatedProduct: Product) => void;
}

const EditProductModal = ({
  product,
  categories,
  onUpdateProduct,
  onCancel,
}: EditProductModalProps) => {
  const [productName, setProductName] = useState<string>(product.name);
  const [description, setDescription] = useState<string>(product.description);
  const [price, setPrice] = useState<string>(String(product.price));
  const [variants, setVariants] = useState<ProductVariant[]>(product.variants);
  const [selectedCategory, setSelectedCategory] = useState<number>(
    product.categoryId,
  );
  const [selectedSubategory, setSelectedSubcategory] = useState<number | null>(
    product.subcategoryId,
  );

  const subcategories =
    categories.find((c) => c.id === selectedCategory)?.subcategories ?? [];


  const updateVariantStock = (id: number, stock: number) => {
    setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, stock } : v)));
  };
  const deleteVariant = (id: number) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, deleted_at: new Date() } : v)),
    );
  };

  useEffect(() => {
    setProductName(product.name);
    setDescription(product.description);
    setPrice(String(product.price));
    setVariants(product.variants);
    setSelectedCategory(product.categoryId);
    setSelectedSubcategory(product.subcategoryId);
  }, [product]);

  useEffect(() => {
    if (selectedSubategory === null && subcategories.length > 0) {
      setSelectedSubcategory(subcategories[0].id);
    }
  }, [selectedCategory, subcategories]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedPrice = Number(price);
    const activeVariants = variants.filter((v) => !v.deleted_at);

    if (!productName.trim()) {
      alert("Nome do produto obrigatório");
      return;
    }

    if (!selectedCategory) {
      alert("Selecione uma categoria");
      return;
    }

    if (activeVariants.length === 0) {
      alert("O produto deve ter pelo menos uma variante");
      return;
    }

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert("Preço inválido");
      return;
    }

    const payload = {
      name: productName,
      description,
      price: parsedPrice,
      category_id: selectedCategory,
      subcategory_id: selectedSubategory,
      variants: variants.map((v) => ({
        id: v.id,
        stock: v.stock,
        deleted_at: v.deleted_at ?? null,
      })),
    };

    try {
      const res = await updateProduct(product.id, payload);
      onUpdateProduct(res);
      console.log("produto atualizado", res);
      onCancel();
      toast.success("Produto atualizado com sucesso!");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-4 max-w-xl w-full flex flex-col gap-4"
      >
        <p className="text-lg font-medium">Editar Produto</p>
        <ProductInfo
          image={product.image}
          id={product.id}
          stock={product.stock}
        />

        <div className="flex flex-col gap-4">
          <TextInputField
            id="product-name"
            label="Nome do Produto"
            placeHolder="Digite o nome do produto"
            type="text"
            value={productName}
            onChange={setProductName}
          />
          <TextInputField
            id="description"
            label="Descrição"
            placeHolder="Descrição do produto"
            type="text"
            value={description}
            onChange={setDescription}
          />
          <div className="flex gap-4 flex-col md:flex-row">
            <TextInputField
              id="price"
              label="Preço"
              placeHolder="0,00"
              type="text"
              value={price}
              onChange={(value) => setPrice(formatCentsInput(value))}
            />
            <CategorySelector
              categories={categories}
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubategory}
              onChangeCategory={(id: number) => setSelectedCategory(id)}
              onChangeSubcategory={(id: number | null) =>
                setSelectedSubcategory(id)
              }
            />
          </div>
        </div>
        <VariantsTable
          variants={variants}
          updateVariantStock={updateVariantStock}
          deleteVariant={deleteVariant}
        />

        <div className="flex justify-end gap-4 items-center">
          <button
            type="button"
            onClick={onCancel}
            className="border border-emerald-600 text-emerald-600 px-4 py-1 rounded-xl cursor-pointer transition-transform duration-300 hover:-translate-y-0.5"
          >
            Cacelar
          </button>
          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </div>
  );
};

export default EditProductModal;
