import { createContext, useState, type ReactNode } from "react";

export interface Store {
  id: number;
  name: string;
  description: string;
  banner: string;
  profile_photo: string;
  instagram: string;
  whatsApp: string;
  address: string;
  business_hours: string;
}

interface StoreContextType {
  store: Store | null;
  setStore: React.Dispatch<React.SetStateAction<Store | null>>;
}

export const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreContextProvider = ({ children }: StoreProviderProps) => {
  const [store, setStore] = useState<null | Store>(null);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};
