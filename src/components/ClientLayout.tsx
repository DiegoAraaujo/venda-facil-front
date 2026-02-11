import { Outlet, useParams } from "react-router-dom";
import Header from "./Header";
import FloatingWhatsAppButton from "./FloatingWhatsAppButton";
import { useEffect, useState } from "react";
import { getStoreById, registerStoreVisit } from "../services/store";
import { toast } from "sonner";
import { useStore } from "../hooks/UseStore";
import StoreNotFound from "./StoreNotFound";

const ClientLayout = () => {
  const { setStore, store } = useStore();
  const { storeId } = useParams<{ storeId: string }>();
  const numericStoreId = Number(storeId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fectchStore = async () => {
      if (!storeId || isNaN(numericStoreId)) {
        setStore(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getStoreById(numericStoreId);
        setStore(data);

        registerStoreVisit(numericStoreId).catch((err) => {
          console.error("Erro ao registrar visita:", err);
        });
      } catch (error) {
        setStore(null);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fectchStore();
  }, [storeId]);

  if (loading) {
    return (
      <div className="h-dvh flex justify-center gap-4 items-center">
        <i className="bi bi-shop text-2xl sm:text-3xl font-bold text-emerald-600" />
        <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
          Preparando Loja
        </p>
        <div className="flex items-end gap-1 h-6">
          <span className="dot dot-1 bg-emerald-600 w-2 h-2" />
          <span className="dot dot-2 bg-emerald-600 w-2 h-2" />
          <span className="dot dot-3 bg-emerald-600 w-2 h-2" />
        </div>
      </div>
    );
  }

  if (!store) {
    return <StoreNotFound />;
  }

  return (
    <main className="flex flex-col min-h-dvh">
      <Header />
      <div className="max-w-7xl w-full m-auto flex-1 flex">
        <Outlet />
      </div>
      <FloatingWhatsAppButton phoneNumber={store.whatsApp} />
    </main>
  );
};

export default ClientLayout;
