interface OrderMethodOptionProps {
  icon: string;
  title: string;
  description: string;
  onSelect: () => void;
}
const OrderMethodOption = ({
  description,
  icon,
  title,
  onSelect,
}: OrderMethodOptionProps) => {
  return (
    <div
      onClick={onSelect}
      className="flex gap-4 items-center border border-gray-300 p-4 rounded-2xl hover:border-emerald-600 transition-colors duration-300 cursor-pointer hover:bg-emerald-50"
    >
      <i
        className={`bg-emerald-100 text-emerald-600 bi ${icon} text-lg w-10 h-10 rounded-xl flex justify-center items-center`}
      />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default OrderMethodOption;
