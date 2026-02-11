import { AnimatePresence, motion } from "framer-motion";
import CartItem from "./components/CartItem";
import { useCart } from "../../hooks/UseCart";
import type { CartItemProduct } from "../catalog/interface";
import { useEffect, useState } from "react";
import UnavailableCartItem from "./components/UnavailableCartItem";
import { getCartProducts } from "../../services/store";
import { toast } from "sonner";
import { formatCurrency } from "../../utils/formatCurrency";
import OrderMethodSelector from "./components/OrderMethodSelector";
import useDebounce from "../../hooks/UseDebounce";
import { createPurchase } from "../../services/purchasesService";
import { useStore } from "../../hooks/UseStore";
import EmptyState from "../../components/EmptyState";
import EmptyCart from "../../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";

interface CartProps {
  onClose: () => void;
}

type OrderMethod = "delivery" | "pickup" | null;

const Cart = ({ onClose }: CartProps) => {
  const { store } = useStore();
  const navigate = useNavigate();
  const { cartProducts, setCartProducts } = useCart();
  const [isOrderMethodSelectorOpen, setIsOrderMethodSelectorOpen] =
    useState(false);
  const debouncedCartProducts = useDebounce(cartProducts, 400);

  const [orderMethod, setOrderMethod] = useState<OrderMethod>(null);
  const [cartItems, setCartItems] = useState<CartItemProduct[]>([]);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [whatsApp, setWhatsApp] = useState("");

  if (!store) return null;

  useEffect(() => {
    if (debouncedCartProducts.length === 0) {
      setCartItems([]);
      return;
    }

    const fetchData = async () => {
      try {
        const cartItems  = await getCartProducts(debouncedCartProducts);
        setCartItems(cartItems );
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };

    fetchData();
  }, [debouncedCartProducts]);

  useEffect(() => {
    setAddress("");
  }, [orderMethod]);

  const removeItemFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((p) => p.variantId !== id));
    setCartProducts((prev) => prev.filter((p) => p.variantId !== id));
  };

  const clearCart = () => {
    setCartProducts([]);
    setCartItems([]);
  };

  const validItems = cartItems.filter(
    (ct) => ct.available && ct.inStock >= ct.cartQuantity,
  );
  const invalidItems = cartItems.filter(
    (ct) => !ct.available || ct.inStock < ct.cartQuantity,
  );

  const orderTotal = validItems.reduce(
    (acc, p) => acc + p.product.price * p.cartQuantity,
    0,
  );

  const submitOrder = async () => {
    if (!fullName.trim())
      return toast.warning("Por favor, informe seu nome completo");
    if (orderMethod === "delivery" && !address.trim())
      return toast.warning("Por favor, informe seu endereço");

    if (cartProducts.length === 0)
      return toast.warning("Seu carrinho está vazio");

    if (!/^\d{11}$/.test(whatsApp))
      return toast.warning("WhatsApp inválido. Use DDD + número");

    try {
      await createPurchase(store.id, {
        full_name: fullName,
        address,
        whatsApp,
        items: cartProducts.map((c) => {
          return { quantity: c.quantity, variantId: c.variantId };
        }),
      });
      toast.success("Pedido realizado com sucesso!");
      clearCart();
      setFullName("");
      setAddress("");
      setWhatsApp("");
      setIsOrderMethodSelectorOpen(false);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      className="fixed top-0  right-0 bg-white shadow-lg z-30 min-h-dvh max-w-106 w-full p-4 flex flex-col justify-between"
      initial={{ x: 384, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 384, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="flex justify-between  border-b border-gray-300 pb-4 items-center">
        <div className="flex gap-3 items-center">
          <div className="h-10 w-10 bg-green-100 rounded-full flex justify-center items-center">
            <i className="bi bi-bag text-lg text-green-700" />
          </div>
          <div>
            <p className="text-lg font-semibold">Seu Carrinho</p>
            <p className="text-gray-500 text-sm">
              {cartProducts.length}{" "}
              {cartProducts.length === 1 ? "item" : "itens"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 bg-gray-200 rounded-full hover:bg-gray-100  transition-colors duration-300 cursor-pointer"
        >
          <i className="bi bi-x-lg " />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <EmptyState
          title="Seu carrinho está vazio"
          description="Parece que você ainda não adicionou nenhum produto. Explore nossa loja e encontre algo que goste!"
          buttonText="Voltar ao Catálogo"
          onButtonClick={() => {
            navigate(`/store/${store.id}/catalog`);
            onClose();
          }}
        >
          <img
            src={EmptyCart}
            alt="Nenhum produto disponível"
            className="w-52 rounded-2xl"
          />
        </EmptyState>
      ) : (
        <div className="flex flex-col gap-4  py-4 overflow-y-auto no-scrollbar h-106">
          {cartItems.map((item) => {
            const isInvalid =
              !item.available || item.inStock < item.cartQuantity;

            if (isInvalid) {
              return (
                <UnavailableCartItem
                  key={item.variantId}
                  title={item.product.name}
                  size={item.size}
                  color={item.color}
                  image={item.product.image}
                  onDelete={() => removeItemFromCart(item.variantId)}
                />
              );
            }

            return (
              <CartItem
                key={item.variantId}
                variantId={item.variantId}
                title={item.product.name}
                size={item.size}
                color={item.color}
                price={item.product.price}
                quantity={item.cartQuantity}
                maxAvailableQuantity={item.inStock}
                image={item.product.image}
                onDelete={() => removeItemFromCart(item.variantId)}
              />
            );
          })}
        </div>
      )}

      <div className="flex flex-col gap-2 border-t border-gray-300 py-4">
        <div className="flex justify-between">
          <p className="text-gray-500">Total</p>
          <p className="text-xl font-bold">{formatCurrency(orderTotal)}</p>
        </div>
        <button
          disabled={cartItems.length === 0 || invalidItems.length > 0}
          className="bg-emerald-600 text-white rounded-xl  px-4 py-2 cursor-pointer hover:-translate-y-0.5 transition-transform duration-300
          disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
          onClick={() => setIsOrderMethodSelectorOpen(true)}
        >
          Realizar Pedido
        </button>
        <button
          onClick={clearCart}
          className="text-gray-500 text-xs cursor-pointer hover:text-red-500"
        >
          Limpar Carrinho
        </button>
      </div>
      <AnimatePresence>
        {isOrderMethodSelectorOpen && (
          <div
            className="fixed bg-black/40 w-full min-h-dvh inset-0 flex items-center justify-center p-6 backdrop-blur cursor-pointer"
            onClick={() => setIsOrderMethodSelectorOpen(false)}
          >
            <OrderMethodSelector
              onClose={() => setIsOrderMethodSelectorOpen(false)}
              orderTotal={orderTotal}
              fullName={fullName}
              onFullNameChange={setFullName}
              address={address}
              onAddressChange={setAddress}
              whatsApp={whatsApp}
              onWhatsAppChange={setWhatsApp}
              onSubmitOrder={submitOrder}
              orderMethod={orderMethod}
              setOrderMethod={setOrderMethod}
            />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Cart;
