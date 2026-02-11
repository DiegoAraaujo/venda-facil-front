import { useState } from "react";
import type { Variant } from "../interface";
import ToggleOption from "./ToggleOption";
import VariantInputRow from "./VariantInputRow";
import VariantItem from "./VariantItem";
import { toast } from "sonner";
import SectionHeader from "../../../components/SectionHeader";

interface VariantManagerProps {
  variants: Variant[];
  setVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
}

const normalizeText = (value: string) => value.trim().toUpperCase();

const VariantManager = ({ setVariants, variants }: VariantManagerProps) => {
  const [hasColor, setHasColor] = useState<boolean>(false);
  const [isOneSize, setIsOneSize] = useState<boolean>(false);
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const addVariant = () => {
    if (!isOneSize && !size.trim()) {
      toast.warning("Escolha um tamanho para essa opção");
      return;
    }

    if (hasColor && !color.trim()) {
      toast.warning("Escolha uma cor para essa opção");
      return;
    }

    if (quantity <= 0) {
      toast.warning("Informe uma quantidade válida em estoque");
      return;
    }

    const normalizedSize = isOneSize ? "TAMANHO UNICO" : normalizeText(size);

    const normalizedColor = hasColor ? normalizeText(color) : null;

    const alreadyExists = variants.some(
      (v) =>
        normalizeText(v.size) === normalizedSize &&
        (v.color ? normalizeText(v.color) : null) === normalizedColor,
    );

    if (
      variants.length === 1 &&
      variants[0].color === null &&
      variants[0].size === "TAMANHO UNICO"
    ) {
      toast.warning("Não exitem mais combinações possiveis");
      return;
    }

    if (alreadyExists) {
      toast.warning("Essa combinação de tamanho e cor já existe");
      return;
    }

    setVariants((prev) => [
      ...prev,
      {
        size: normalizedSize,
        color: normalizedColor,
        stock: quantity,
      },
    ]);

    toast.success("Opção adicionada com sucesso");

    setSize("");
    setColor("");
    setQuantity(1);
  };

  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
    toast.success("Opção removida com sucesso");
  };

  return (
    <div className="flex flex-col gap-8 w-full ">
      <SectionHeader step={3} title="Tamanhos, cores e estoque" />

      <div className="flex flex-col gap-4">
        <p className="text-gray-500 text-sm">
          Essas configurações definem como as opções do produto funcionam e se
          aplicam a todas as opções criadas. Quando o produto tiver apenas
          tamanho único e não usar cores, haverá apenas uma opção.
        </p>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 border border-gray-300 rounded-xl bg-gray-100 p-4">
            <ToggleOption
              label="Informar cores"
              description="Marque se o produto tem variações de cor"
              checked={hasColor}
              onToggle={() => setHasColor((prev) => !prev)}
              disabled={variants.length > 0}
            />

            <ToggleOption
              label="Tamanho único"
              description="Produto com um só tamanho"
              checked={isOneSize}
              onToggle={() => setIsOneSize((prev) => !prev)}
              disabled={variants.length > 0}
            />
          </div>

          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-100 p-4 flex flex-col gap-4">
            <VariantInputRow
              color={color}
              hasColor={hasColor}
              isOneSize={isOneSize}
              quantity={quantity}
              size={size}
              setVariantColor={setColor}
              setVariantQuantity={setQuantity}
              setVariantSize={setSize}
            />

            <button
              className="border-emerald-700 rounded-xl px-4 py-1 flex justify-center bg-white w-full border text-emerald-700 hover:-translate-y-0.5 duration-300 transition-transform cursor-pointer text-sm gap-4
              disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              onClick={addVariant}
            >
              <i className="bi bi-plus-lg" /> Adicionar Variação
            </button>
          </div>
        </div>
      </div>

      {variants.length > 0 ? (
        variants.map((v, index) => (
          <div key={index} className="flex flex-col gap-4">
            <VariantItem
              color={v.color}
              quantity={v.stock}
              size={v.size}
              removeVariant={() => removeVariant(index)}
            />
          </div>
        ))
      ) : (
        <p className="text-xs text-gray-500 text-center">
          Nenhuma variação adicionada ainda
        </p>
      )}
    </div>
  );
};

export default VariantManager;
