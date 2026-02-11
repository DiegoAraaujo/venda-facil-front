import { formatCurrency } from "../../../utils/formatCurrency";

interface TopProductItemProps {
  rank: number;
  imageUrl: string;
  productName: string;
  salesCount: number;
  price: number;
}

const TopProductItem = ({
  rank,
  imageUrl,
  productName,
  salesCount,
  price,
}: TopProductItemProps) => {
  return (
    <div className="flex gap-4 justify-between bg-gray-100 rounded-2xl px-4 py-2 cursor-pointer items-center">
      <div className="flex gap-4 items-center">
        <p className="bg-emerald-100 text-emerald-600 font-bold rounded-lg w-8 h-8 flex justify-center items-center">
          {rank}
        </p>
        <div className="w-12 h-12 rounded-xl">
          <img
            src={imageUrl}
            alt={productName}
            className="h-full object-cover rounded-xl"
          />
        </div>
        <div>
          <p className="text-sm font-medium">{productName}</p>
          <p className="text-xs text-gray-500">{salesCount} vendas</p>
        </div>
      </div>
      <p className="text-emerald-600 font-semibold text-sm">
        {formatCurrency(price)}
      </p>
    </div>
  );
};

export default TopProductItem;
