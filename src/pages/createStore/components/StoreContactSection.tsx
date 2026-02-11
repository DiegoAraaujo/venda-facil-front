import SectionHeader from "../../../components/SectionHeader";
import TextInputField from "../../../components/TextInputField";
import { formatWhatsApp } from "../../../utils/formatWhatsApp";
import { sanitizeInstagram } from "../../../utils/sanitizeInstagram";
import { sanitizeWhatsApp } from "../../../utils/sanitizeWhatsApp";

interface StoreContactSectionProps {
  whatsApp: string;
  onWhatsAppChange: (value: string) => void;
  instagram: string;
  onInstagramChange: (value: string) => void;
  address: string;
  onAddressChange: (value: string) => void;
  openingHours: string;
  onOpeningHoursChange: (value: string) => void;
}

const StoreContactSection = (props: StoreContactSectionProps) => {
  const handleWhatsApp = (value: string) => {
    props.onWhatsAppChange(sanitizeWhatsApp(value));
  };

  const handleInstagram = (value: string) => {
    props.onInstagramChange(sanitizeInstagram(value));
  };

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader step={3} title="Contato" />
      <div className="flex flex-col gap-4">
        <TextInputField
          id="whatsapp"
          label="WhatsApp"
          onChange={handleWhatsApp}
          value={formatWhatsApp(props.whatsApp)}
          type="text"
          placeHolder="(88) 9 9999-9999"
          icon="bi-whatsapp"
        />
        <TextInputField
          id="instagram"
          label="Instagram"
          onChange={handleInstagram}
          value={props.instagram}
          type="text"
          placeHolder="suaLoja"
          icon="bi-instagram"
        />
        <TextInputField
          id="address"
          label="Endereço"
          onChange={props.onAddressChange}
          value={props.address}
          type="text"
          placeHolder="Rua, número - Cidade/UF"
          icon="bi-geo-alt"
        />
        <TextInputField
          id="opening-hours"
          label="Horário de Funcionamento"
          onChange={props.onOpeningHoursChange}
          value={props.openingHours}
          type="text"
          placeHolder="Seg à Sex: 9h às 18h"
          icon="bi-clock"
        />
      </div>
    </div>
  );
};

export default StoreContactSection;
