import { createContext, useEffect, useState, type ReactNode } from "react";

export interface CartProduct {
  quantity: number;
  productid: number;
  variantId: number;
}

interface CartContextType {
  cartProducts: CartProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

export const CartContextProvider = ({ children }: CartProviderProps) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>(() => {
    const storedCart = localStorage.getItem("vendaFacilCart");
    return storedCart ? (JSON.parse(storedCart) as CartProduct[]) : [];
  });

  useEffect(() => {
    localStorage.setItem("vendaFacilCart", JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts }}>
      {children}
    </CartContext.Provider>
  );
};
