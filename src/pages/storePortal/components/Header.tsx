import { Link } from "react-router-dom";
import VendaFacilLogo from "../../../assets/venda_facil_logo.png";
const Header = () => {
  return (
    <header className="shadow-sm  sticky top-0 left-0 z-30 bg-white mb-8">
      <div className="max-w-7xl w-full m-auto p-4 flex justify-between border-b border-gray-300 items-center">
        <img src={VendaFacilLogo} alt="Logo venda Fácil" className="h-12" />
        <div className="flex gap-4">
          <Link
            to="/login"
            className="rounded-xl text-sm bg-white py-2 px-4 cursor-pointer hover:-translate-y-0.5 transition-transform duration-300 hover:bg-emerald-50"
          >
            Entrar
          </Link>
          <Link
            to="/create-store"
            className="rounded-xl text-sm bg-black text-white py-2 px-4 cursor-pointer hover:-translate-y-0.5 transition-transform duration-300 hover:shadow-md"
          >
            Criar Loja
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
