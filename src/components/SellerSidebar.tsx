import { useAuth } from "../hooks/UseAuth";
import MenuLinks from "./MenuLinks";

const SellerSidebar = () => {
  const { logout } = useAuth();
  return (
    <div className="border border-gray-300 h-dvh flex-col hidden lg:flex">
      <div className="p-6 border-b border-gray-300">
        <p className="font-medium">Loja do Zé</p>
        <p className="text-gray-500 text-xs">Painel do Vendedor</p>
      </div>
      <div className="flex flex-col justify-between flex-1 p-2 ">
        <MenuLinks />
        <button
          onClick={logout}
          className="text-red-500  rounded-2xl py-2 px-4  hover:bg-red-50 flex gap-2 cusor-pointer cursor-pointer hover:-translate-y-0.5 transition-all duration-300"
        >
          <i className="bi bi-box-arrow-right" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default SellerSidebar;
