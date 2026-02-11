import { formatCurrency } from "../../../utils/formatCurrency";
import { confirmToast } from "../../categories/components/confirmDeleteCategory";

interface SellerProductRowProps {
  imageUrl: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  onDelete: () => void;
  onEditProduct: () => void;
}

const SellerProductRow = ({
  imageUrl,
  name,
  category,
  price,
  stock,
  onDelete,
  onEditProduct,
}: SellerProductRowProps) => {
  return (
    <tr className=" hover:bg-gray-50 transition">
      <td className="px-2 py-3 hidden md:table-cell">
        <img src={imageUrl} className="w-12 h-12 rounded-lg object-cover" />
      </td>

      <td className="px-2 py-3">
        <p className="md:text-sm font-medium text-xs">{name}</p>
      </td>

      <td className="px-2 py-3 hidden md:table-cell">
        <span className="px-3 py-1 rounded-full text-xs border border-gray-300">
          {category}
        </span>
      </td>

      <td className="px-2 py-3 text-left font-semibold text-xs md:text-sm whitespace-nowrap">
        {formatCurrency(price)}
      </td>

      <td className="px-2 py-3 text-center hidden sm:table-cell">
        <span className="px-3 py-1 rounded-full text-xs border border-gray-300">
          {stock} un
        </span>
      </td>

      <td className="px-2 py-3 text-right">
        <button className="w-9 h-9 flex items-center justify-center rounded-lg  gap-2">
          <i
            className="bi bi-trash text-red-500 cursor-pointer"
            onClick={() =>
              confirmToast({
                title: "Deseja realmente excluir este Produto?",
                description: "essa ação nao podera ser desfeita!",
                confirmLabel: "Excluir",
                variant: "danger",
                onConfirm: () => {
                  onDelete();
                },
              })
            }
          />
          <i
            onClick={onEditProduct}
            className="bi bi-pencil-square cursor-pointer"
          />
        </button>
      </td>
    </tr>
  );
};

export default SellerProductRow;
