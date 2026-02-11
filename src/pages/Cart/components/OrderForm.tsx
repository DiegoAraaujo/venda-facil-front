import { useStore } from "../../../hooks/UseStore";
import TextInputField from "../../../components/TextInputField";
import { sanitizeWhatsApp } from "../../../utils/sanitizeWhatsApp";
import OrderSummary from "./OrderSummary";
import PickupInfo from "./PickupInfo";
import { formatWhatsApp } from "../../../utils/formatWhatsApp";

type OrderMethod = "delivery" | "pickup" | null;

interface OrderFormProps {
  fullName: string;
  address: string;
  whatsApp: string;
  onFullNameChange: (v: string) => void;
  onAddressChange: (v: string) => void;
  onWhatsAppChange: (v: string) => void;
  orderMethod: OrderMethod;
  orderTotal: number;
  onSubmitOrder: () => void;
}

const OrderForm = ({
  fullName,
  address,
  whatsApp,
  onFullNameChange,
  onAddressChange,
  onWhatsAppChange,
  orderMethod,
  onSubmitOrder,
  orderTotal,
}: OrderFormProps) => {
  const { store } = useStore();

  if (!store) return null;

  const handleWhatsApp = (value: string) => {
    onWhatsAppChange(sanitizeWhatsApp(value));
  };
  return (
    <form className="flex flex-col p-4 gap-4">
      <TextInputField
        label="Nome Completo"
        id="full-name"
        placeHolder="Seu nome completo"
        type="text"
        onChange={onFullNameChange}
        value={fullName}
      />

      <TextInputField
        label="WhatsApp"
        id="whatsapp"
        placeHolder="(00) 00000-0000"
        type="text"
        onChange={handleWhatsApp}
        value={formatWhatsApp(whatsApp)}
      />

      {orderMethod === "delivery" && (
        <TextInputField
          label="Endereço Completo"
          id="address"
          placeHolder="Rua, número - Cidade/UF"
          type="text"
          onChange={onAddressChange}
          value={address}
        />
      )}

      {orderMethod === "pickup" && <PickupInfo address={store.address} />}

      <OrderSummary total={orderTotal} />

      <button
        onClick={(e) => {
          e.preventDefault();
          onSubmitOrder();
        }}
        className="text-white bg-emerald-600 rounded-xl px-4 py-2 cursor-pointer hover:-translate-y-0.5 duration-300 transition-transform"
        type="submit"
      >
        Confirmar Pedido
      </button>
    </form>
  );
};

export default OrderForm;
