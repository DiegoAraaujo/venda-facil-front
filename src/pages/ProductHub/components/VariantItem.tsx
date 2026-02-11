interface VariantItemProps {
  size: string;
  color?: string | null;
  quantity: number;
  removeVariant: () => void;
}

const VariantItem = ({
  color,
  quantity,
  size,
  removeVariant,
}: VariantItemProps) => {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-100 p-4 flex gap-4 relative items-center">
      <p className="text-xs flex gap-2">
        <span className="font-semibold">Tamanho:</span> {size}
      </p>
      {color && (
        <p className="text-xs flex gap-2">
          <span className="font-semibold">Cor:</span> {color}
        </p>
      )}
      <p className="text-xs flex gap-2">
        <span className="font-semibold">Quantidade:</span> {quantity}
      </p>
      <button
        className="absolute w-6 h-6 hover:-translate-y-0.5 duration-300 transition-transform cursor-pointer top-2 right-2 text-gray-500"
        onClick={removeVariant}
      >
        <i className="bi bi-x text-xl" />
      </button>
    </div>
  );
};

export default VariantItem;
