interface QuantitySelectorProps {
  selectedQuantity: number;
  setSelectedQuantity: React.Dispatch<React.SetStateAction<number>>;
  stock: number;
}

const QuantitySelector = ({
  selectedQuantity,
  setSelectedQuantity,
  stock,
}: QuantitySelectorProps) => {
  return (
    <div className="flex flex-col gap-2 items-start">
      <p className="text-sm">Quantidade</p>
      <div className="inline-flex items-center border border-gray-300 rounded-2xl">
        <button
          disabled={selectedQuantity === 1}
          onClick={() =>
            setSelectedQuantity((prev) => (prev > 1 ? prev - 1 : prev))
          }
          className={`text-xl py-0.5 px-3 rounded-l-2xl transition
                  ${
                    selectedQuantity === 1
                      ? "opacity-40 cursor-not-allowed pointer-events-none"
                      : "cursor-pointer hover:bg-gray-300"
                  }
                `}
        >
          -
        </button>

        <p className="py-0.5 px-3 text-sm">{selectedQuantity}</p>
        <button
          disabled={stock !== null && selectedQuantity >= stock}
          onClick={() =>
            setSelectedQuantity((prev) =>
              stock !== null && prev < stock ? prev + 1 : prev
            )
          }
          className={`text-xl py-0.5 px-3 rounded-r-2xl transition
                  ${
                    selectedQuantity === stock
                      ? "opacity-40 cursor-not-allowed pointer-events-none"
                      : "cursor-pointer hover:bg-gray-300"
                  }
                `}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
