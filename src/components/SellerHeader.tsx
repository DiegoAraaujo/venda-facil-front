import { useEffect, useState } from "react";
import MenuLinks from "./MenuLinks";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const headerLabels = {
  dashboard: {
    name: "Dashboard",
    description: "Visão geral da sua loja",
  },
  products: {
    name: "Produtos",
    description: "Gerencie e cadastre novos produtos",
  },
  "new-products": {
    name: "Produtos",
    description: "Gerencie e cadastre novos produtos",
  },
  orders: {
    name: "Pedidos",
    description: "Acompanhe seus pedidos",
  },
  settings: {
    name: "Configurações",
    description: "Gerencie sua loja",
  },
  categories: {
    name: "Categorias",
    description: "Organize e gerencie as categorias dos seus produtos",
  },
};
type SellerPages = keyof typeof headerLabels;

const SellerHeader = () => {
  const [showSlideBar, setShowSlideBar] = useState<boolean>(false);
  const location = useLocation();
  const currentSellerPage = location.pathname.split(
    "/seller/",
  )[1] as SellerPages;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSlideBar(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="flex gap-4 p-6 border border-gray-300 lg:border-l-0 sticky top-0 left-0 bg-white z-50">
      <button
        className="lg:hidden hover:bg-emerald-50 px-2 rounded-xl hover:text-emerald-700"
        onClick={() => setShowSlideBar(!showSlideBar)}
      >
        <i
          className={`bi ${showSlideBar ? "bi-x" : "bi-list"} text-xl cursor-pointer`}
        />
      </button>
      <div>
        <p className="text-sm lg:text-base font-medium">
          {headerLabels[currentSellerPage]?.name || "Sua Loja"}
        </p>
        <p className="text-xs text-gray-500">
          {headerLabels[currentSellerPage]?.description || ""}
        </p>
      </div>
      <AnimatePresence>
        {showSlideBar && (
          <motion.div
            className="absolute w-full left-0 p-4 bg-white lg:hidden"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 61, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <MenuLinks onClose={()=> setShowSlideBar(false)}/>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SellerHeader;
