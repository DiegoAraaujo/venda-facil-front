interface FloatingWhatsAppButtonProps {
  phoneNumber: string;
}
const FloatingWhatsAppButton = ({
  phoneNumber,
}: FloatingWhatsAppButtonProps) => {
  return (
    <a
      href={`https://wa.me/55${phoneNumber}`}
      target="_blank"
      className="bg-green-500 text-white  rounded-full font-medium  md text-2xl py-2 px-3 fixed md:bottom-4 md:right-4 bottom-2 right-2 animate-bounce cursor-pointer"
    >
      <i className="bi bi-whatsapp" />
    </a>
  );
};

export default FloatingWhatsAppButton;
