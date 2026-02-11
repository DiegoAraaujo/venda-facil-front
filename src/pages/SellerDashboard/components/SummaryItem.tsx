interface SummaryItemProps {
  label: string;
  icon: string;
  color: string;
  value: number;
}

const SummaryItem = ({ label, color, icon, value }: SummaryItemProps) => {
  return (
    <div className="flex gap-4 justify-between bg-gray-100 rounded-2xl px-4 py-2 cursor-pointer">
      <span className="flex gap-4 items-center">
        <i style={{ color }} className={`bi ${icon} text-xl`} />
        <p className="text-sm font-medium"> {label}</p>
      </span>
      <span className="font-bold text-lg">{value}</span>
    </div>
  );
};

export default SummaryItem;
