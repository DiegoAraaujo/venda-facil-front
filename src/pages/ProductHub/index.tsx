import { useState } from "react";
import type { Variant } from "./interface";
import ProductImages from "./components/ProductImages";
import ProductInfoForm from "./components/ProductInfoForm";
import VariantManager from "./components/VariantManager";
import ProductHubHeader from "./components/ProductHubHeader";
import { toast } from "sonner";
import { createProduct } from "../../services/product";
import type { Product } from "../../interfaces/Product";
import Button from "../../components/Button";

const ProductHub = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [subCategorySelected, setSubCategorySelected] = useState<number | null>(
    null,
  );
  const [variants, setVariants] = useState<Variant[]>([]);
  const [resetKey, setResetKey] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    const parsedPrice = Number(price);

    if (!productName.trim()) {
      return toast.warning("O nome do produto é um dado obrigatorio!");
    }
    if (!price.trim() || isNaN(parsedPrice) || parsedPrice <= 0) {
      return toast.warning("Informe um preço válido maior que 0");
    }
    if (categorySelected === null) {
      return toast.warning("Selecione uma categoria para este Produto");
    }
    if (images.length === 0) {
      return toast.warning("Adicione ao menos uma imagem do produto");
    }
    if (variants.length <= 0) {
      return toast.warning(
        "Você deve informar ao menos uma variação do produto!",
      );
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category_id", categorySelected.toString());

    if (subCategorySelected) {
      formData.append("subcategory_id", subCategorySelected.toString());
    }

    formData.append("variants", JSON.stringify(variants));
    images.forEach((img) => formData.append("images", img));

    try {
      setLoading(true);
      const data: Product = await createProduct(formData);
      toast.success(`${data.name} foi adicionado ao seu catalogo`);
      setImages([]);
      setPreviewImages([]);
      setCategorySelected(null);
      setSubCategorySelected(null);
      setDescription("");
      setPrice("");
      setProductName("");
      setVariants([]);
      setResetKey((prev) => prev + 1);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full p-4 md:p-8 gap-8 flex flex-col">
      <ProductHubHeader />
      <ProductImages
        images={images}
        setImages={setImages}
        previewImages={previewImages}
        setPreviewImages={setPreviewImages}
      />

      <ProductInfoForm
        productName={productName}
        setProductName={setProductName}
        description={description}
        setDescription={setDescription}
        categorySelected={categorySelected}
        setCategorySelected={setCategorySelected}
        price={price}
        setPrice={setPrice}
        subCategorySelected={subCategorySelected}
        setSubcategorySelected={setSubCategorySelected}
      />

      <VariantManager
        variants={variants}
        setVariants={setVariants}
        key={resetKey}
      />

      <div className="w-full flex justify-end">
        <Button
          onClick={() => handleSubmit()}
          isLoading={loading}
          loadingText="Cadastrando Produto"
        >
          Cadastrar Produto
        </Button>
      </div>
    </section>
  );
};

export default ProductHub;
