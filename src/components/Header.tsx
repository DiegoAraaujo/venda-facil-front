import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TabletMenu from "./TabletMenu";
import { AnimatePresence } from "framer-motion";
import Cart from "../pages/Cart";
import { useStore } from "../hooks/UseStore";
import { useCart } from "../hooks/UseCart";
import StoreIdentity from "./StoreIdentity";
import StoreNavigation from "./StoreNavigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { store } = useStore();
  const { cartProducts } = useCart();

  if (!store) return null;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <header className="shadow-sm sticky top-0 left-0 z-30 bg-white">
      <div className="max-w-7xl w-full m-auto px-4 py-2 flex justify-between border-b border-gray-300">
        <StoreIdentity logoUrl={store.profile_photo} name={store.name} />

        <StoreNavigation storeId={store.id} />

        <div className="items-center flex gap-4 relative">
          {cartProducts.length > 0 && (
            <div className="absolute left-3 top-0 bg-emerald-500 w-5 h-5 text-white text-xs justify-center flex items-center rounded-full">
              {cartProducts.length}
            </div>
          )}
          <button onClick={openCart}>
            <i className="bi bi-cart text-xl cursor-pointer" />
          </button>
          <Link to="/">
            <i className="bi bi-box-arrow-in-left text-xl"></i>
          </Link>
          <button
            className="cursor-pointer md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`bi ${isMenuOpen ? "bi-x" : "bi-list"} text-2xl`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <TabletMenu onClose={() => setIsMenuOpen(false)} storeId={store.id} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <div
            className="fixed bg-black/40 w-full min-h-dvh right-0 top-0 z-40 backdrop-blur cursor-pointer"
            onClick={closeCart}
          >
            <Cart onClose={closeCart} />
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
