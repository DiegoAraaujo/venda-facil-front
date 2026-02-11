import { Link } from "react-router-dom";

interface StoreNavigationProps {
  storeId: number;
}
// className="flex flex-col gap-4 p-6"
const StoreNavigation = ({ storeId }: StoreNavigationProps) => {
  return (
    <div className="gap-8 items-center font-medium hidden md:flex">
      <Link to={`/store/${storeId}/catalog`} className="text-gray-500">
        Catálogo
      </Link>
      <Link to={`/store/${storeId}/about`} className="text-gray-500 flex gap-2">
        <i className="bi bi-shop" /> Sobre a Loja
      </Link>
    </div>
  );
};

export default StoreNavigation;
