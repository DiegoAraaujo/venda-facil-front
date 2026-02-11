interface StoreStatItemProps {
  icon: string;
  value: number | string;
  label: string;
  color: string;
}

const StoreStatItem = ({ icon, value, label, color }: StoreStatItemProps) => {
  return (
    <div className="border border-gray-300 rounded-xl px-4 sm:px-8 sm:py-4 text-center py-2">
      <i className={`${icon} sm:text-xl`} style={{ color: `${color}` }} />
      <p className="sm:text-2xl font-semibold">{value}</p>
      <p className="text-gray-500 sm:text-sm text-xs">{label}</p>
    </div>
  );
};

export default StoreStatItem;
