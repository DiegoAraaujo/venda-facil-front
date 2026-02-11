interface VariantInputRowProps {
  isOneSize: boolean;
  hasColor: boolean;
  size: string;
  color: string;
  quantity: number;
  setVariantSize: (size: string) => void;
  setVariantColor: (color: string) => void;
  setVariantQuantity: (quantity: number) => void;
}

const VariantInputRow = ({
  hasColor,
  isOneSize,
  color,
  quantity,
  size,
  setVariantColor,
  setVariantQuantity,
  setVariantSize,
}: VariantInputRowProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="size" className="text-xs">
          Tamanho
        </label>
        <input
          value={isOneSize ? "Tamanho unico" : size}
          onChange={(e) => setVariantSize(e.target.value)}
          type="text"
          id="size"
          className="border bg-white border-gray-300 rounded-lg py-1.5 text-xs px-2"
          placeholder="Ex: M, 40..."
        />
      </div>
      {hasColor && (
        <div className="flex flex-col gap-2">
          <label htmlFor="color" className="text-xs">
            Cor
          </label>
          <input
            value={color}
            onChange={(e) => setVariantColor(e.target.value)}
            type="text"
            id="color"
            className="border bg-white border-gray-300 rounded-lg py-1.5 text-xs px-2"
            placeholder="Ex: Preto"
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="quantity" className="text-xs">
          Quantidade
        </label>
        <input
          value={quantity}
          onChange={(e) => setVariantQuantity(Number(e.target.value))}
          type="number"
          id="quantity"
          className="border bg-white border-gray-300 rounded-lg py-1.5 text-xs px-2"
          min={1}
        />
      </div>
    </div>
  );
};

export default VariantInputRow;
