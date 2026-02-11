import { Link, useLocation } from "react-router-dom";

interface MenuLinksProps {
  onClose?: () => void;
}

const MenuLinks = ({ onClose }: MenuLinksProps) => {
  const location = useLocation();
  const currentSellerPage = location.pathname.split("/seller/")[1];
  return (
    <div className="flex flex-col gap-1 bg-white w-full relative text-sm">
      <Link
        onClick={onClose}
        to="/seller/dashboard"
        className={` rounded-2xl py-2 px-4 transition-colors duration-200  flex gap-2 ${currentSellerPage === "dashboard" ? "bg-emerald-600 text-white" : "text-gray-500 hover:text-inherit hover:bg-gray-100"}`}
      >
        <i className="bi bi-columns-gap" />
        Dashboard
      </Link>
      <Link
        onClick={onClose}
        to="/seller/orders"
        className={`text-gray-500 hover:text-inherit rounded-2xl py-2 px-4 transition-colors duration-200 hover:bg-gray-100 flex gap-2 ${currentSellerPage === "orders" ? "bg-emerald-600 text-white" : "text-gray-500 hover:text-inherit hover:bg-gray-100"} `}
      >
        <i className="bi bi-clipboard" />
        Pedidos
      </Link>
      <Link
        onClick={onClose}
        to="/seller/products"
        className={`text-gray-500 hover:text-inherit rounded-2xl py-2 px-4 transition-colors duration-200 hover:bg-gray-100 flex gap-2 ${currentSellerPage === "products" || currentSellerPage === "new-product" ? "bg-emerald-600 text-white" : "text-gray-500 hover:text-inherit hover:bg-gray-100"} `}
      >
        <i className="bi bi-box-seam" />
        Produtos
      </Link>
      <Link
        onClick={onClose}
        to="/seller/categories"
        className={`text-gray-500 hover:text-inherit rounded-2xl py-2 px-4 transition-colors duration-200 hover:bg-gray-100 flex gap-2 ${currentSellerPage === "categories" ? "bg-emerald-600 text-white" : "text-gray-500 hover:text-inherit hover:bg-gray-100"} `}
      >
        <i className="bi bi-tags" />
        Categorias
      </Link>
      <Link
        onClick={onClose}
        to="/seller/settings"
        className={`text-gray-500 hover:text-inherit rounded-2xl py-2 px-4 transition-colors duration-200 hover:bg-gray-100 flex gap-2 ${currentSellerPage === "settings" ? "bg-emerald-600 text-white" : "text-gray-500 hover:text-inherit hover:bg-gray-100"} `}
      >
        <i className="bi bi-gear" />
        Configurações
      </Link>
    </div>
  );
};

export default MenuLinks;
