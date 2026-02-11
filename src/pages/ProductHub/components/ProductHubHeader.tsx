import { Link } from "react-router-dom";

const ProductHubHeader = () => {
  return (
    <div className="flex gap-8 items-center  bg-white">
      <Link
        to="/seller/products"
        className="cursor-pointer hover:-translate-x-1 transition-transform duration-300"
      >
        <i className="bi bi-arrow-left text-2xl" />
      </Link>
      <div>
        <p className="font-medium">Novo Produto</p>
        <p className="text-xs text-gray-500">Adicione um produto ao seu catálogo</p>
      </div>
    </div>
  );
};

export default ProductHubHeader;
