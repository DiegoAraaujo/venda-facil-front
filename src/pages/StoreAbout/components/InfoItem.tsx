interface InfoItemProps {
  icon: string;
  label: string;
  description: string;
}

const InfoItem = ({ icon, label, description }: InfoItemProps) => {
  return (
    <div className="flex gap-4 items-center  p-2">
      <i className={`${icon} text-gray-700 text-xl`} />
      <div>
        <p>{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default InfoItem;
