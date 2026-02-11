interface ContactItemProps {
  label: string;
  description: string;
  icon: string;
  color: string;
  whatsApp?: string;
  instagram?: string;
}

const ContactItem = ({
  label,
  description,
  icon,
  color,
  instagram,
  whatsApp,
}: ContactItemProps) => {
  return (
    <a
    target="_blank"
      href={
        whatsApp
          ? `https://wa.me/55${whatsApp}`
          : `https://www.instagram.com/${instagram}`
      }
      className="flex gap-4 hover:bg-gray-100 rounded-xl p-2 cursor-pointer"
    >
      <div
        className="h-12 w-12 rounded-full flex justify-center items-center"
        style={{ backgroundColor: `${color}1A` }}
      >
        <i
          style={{ color: `${color}` }}
          className={`${icon} rounded-full text-2xl`}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p>{label}</p>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </a>
  );
};

export default ContactItem;
