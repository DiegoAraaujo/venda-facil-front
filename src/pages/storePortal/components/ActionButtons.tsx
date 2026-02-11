import { Link } from "react-router-dom";

const ActionButtons = () => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Link to="/create-store" className="bg-emerald-600 text-white rounded-full py-3 px-6 cursor-pointer hover:-translate-y-0.5 transition-transform duration-300 max-w-70 w-full flex gap-4 justify-center group text-sm font-medium">
        <i className="bi bi-shop" />
        Criar minha Loja gratis
        <i className="bi bi-arrow-right group-hover:translate-x-2 transition-transform duration-300" />
      </Link>
      <Link
        to="/login"
        className="text-emerald-800 text-sm group inline-block relative"
      >
        Já possui uma loja? entre aqui
        <div className="h-px w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full absolute left-0 bottom-0"></div>
      </Link>
    </div>
  );
};

export default ActionButtons;
