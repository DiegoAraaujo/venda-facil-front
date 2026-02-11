import { motion } from "framer-motion";
import OrderMethodOption from "./OrderMethodOption";
import OrderForm from "./OrderForm";
import { useStore } from "../../../hooks/UseStore";

type OrderMethod = "delivery" | "pickup" | null;

interface OrderMethodOptionProps {
  onClose: () => void;
  orderTotal: number;
  fullName: string;
  orderMethod: OrderMethod;
  setOrderMethod: React.Dispatch<React.SetStateAction<OrderMethod>>;
  onFullNameChange: (value: string) => void;
  address: string;
  onAddressChange: (value: string) => void;
  whatsApp: string;
  onWhatsAppChange: (value: string) => void;
  onSubmitOrder: () => void;
}

const OrderMethodSelector = ({
  onClose,
  orderTotal,
  address,
  fullName,
  onAddressChange,
  onFullNameChange,
  onWhatsAppChange,
  whatsApp,
  onSubmitOrder,
  orderMethod,
  setOrderMethod,
}: OrderMethodOptionProps) => {
  const { store } = useStore();

  if (!store) return null;

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      initial={{ y: 400, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 400, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="z-50 fixed bottom-0 bg-white rounded-t-2xl  right-0 max-w-106 w-full"
    >
      <div className="flex gap-2 flex-col">
        <div className="flex items-center justify-between p-4">
          {orderMethod && (
            <i
              onClick={(e) => {
                e.stopPropagation();
                setOrderMethod(null);
              }}
              className="bi bi-arrow-left text-xl hover:-translate-x-0.5 transition-transform duration-300"
            />
          )}
          <p className="text-lg font-semibold ">Realizar Pedido</p>
          <i
            onClick={onClose}
            className="bi bi-x bg-gray-100 rounded-full w-8 h-8 text-xl flex items-center justify-center"
          />
        </div>
      </div>

      {orderMethod === null && (
        <div className=" flex flex-col gap-4 p-4 border-gray-300 border-t">
          <p className="text-sm text-gray-500">
            Como você prefere receber o seu pedido?
          </p>
          <OrderMethodOption
            description="Receba no seu endereço"
            icon="bi-geo-alt"
            title="entrega"
            onSelect={() => setOrderMethod("delivery")}
          />
          <OrderMethodOption
            description={store.address}
            icon="bi-shop"
            title="Retirar na Loja"
            onSelect={() => setOrderMethod("pickup")}
          />
        </div>
      )}

      {orderMethod && (
        <OrderForm
          fullName={fullName}
          onFullNameChange={onFullNameChange}
          address={address}
          onAddressChange={onAddressChange}
          whatsApp={whatsApp}
          onWhatsAppChange={onWhatsAppChange}
          orderMethod={orderMethod}
          orderTotal={orderTotal}
          onSubmitOrder={onSubmitOrder}
        />
      )}
    </motion.div>
  );
};

export default OrderMethodSelector;
