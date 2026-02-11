interface UnavailableCartItemProps {
  title: string;
  size: string;
  color: string | null;
  image: string;
  onDelete: () => void;
}

const UnavailableCartItem = ({
  title,
  size,
  color,
  image,
  onDelete,
}: UnavailableCartItemProps) => {
  return (
    <div className="flex gap-4 bg-red-50 p-3 rounded-xl items-center border-dashed border-red-600 border relative">
      <div className="w-22 aspect-square opacity-80">
        <img
          src={image}
          alt=""
          className="rounded-2xl object-cover h-full w-full"
        />
      </div>
      <div className="grow flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium opacity-80 ">{title}</p>
          <p className="opacity-80 text-xs text-gray-500">
            Tam: {size} {color && <span>| Cor: {color}</span>}
          </p>
        </div>
        <p className="text-red-600 text-xs">
          Este produto Não esta mais disponivel
        </p>
        <button
          className="underline text-red-600 text-xs flex justify-start cursor-pointer"
          onClick={onDelete}
        >
          Remover do carrinho
        </button>
      </div>
      <p className="text-xs bg-red-600 text-white px-3 py-0.5 rounded-2xl opacity-80 absolute top-2 right-2">
        Indisponivel
      </p>
    </div>
  );
};

export default UnavailableCartItem;
