import { Link } from "react-router-dom";

const StoreNotFound = () => {
  return (
    <div className="flex flex-col gap-2 m-auto max-w-62.5  items-center p-4 h-dvh justify-center">
      <p className="text-xl font-bold">Loja não encontrada</p>
      <Link
        to="/"
        className="bg-emerald-600 text-white rounded-xl py-2 px-4 flex gap-4"
      >
        <i className="bi bi-arrow-left" />
        Voltar ao início
      </Link>
    </div>
  );
};

export default StoreNotFound;
