import ContactItem from "./ContactItem";

interface StoreContactProps {
  whatsApp: string;
  instagram: string;
}
const StoreContact = ({ instagram, whatsApp }: StoreContactProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-medium">Contato</p>
      <div className="flex flex-col gap-4">
        <ContactItem
          description="Fale Conosco"
          label="WhatsApp"
          icon="bi-whatsapp"
          whatsApp={whatsApp}
          color="#16A34A"
        />
        <ContactItem
          label="Instagram"
          description={`@${instagram}`}
          instagram={instagram}
          icon="bi bi-instagram"
          color="#9D174D"
        />
      </div>
    </div>
  );
};

export default StoreContact;
