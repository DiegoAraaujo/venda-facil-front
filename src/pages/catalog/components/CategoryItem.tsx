interface CategoryItemProps {
  label: string;
  value: number | null;
  isSelected: boolean;
  setCategorySelected: React.Dispatch<React.SetStateAction<number | null>>;
  hasFilters: boolean;
}
const CategoryItem = ({
  label,
  isSelected,
  setCategorySelected,
  hasFilters,
  value,
}: CategoryItemProps) => {
  return (
    <li
      onClick={() => setCategorySelected(value)}
      className={`py-1 px-4 border flex gap-2 items-center rounded-2xl cursor-pointer whitespace-nowrap
              ${
                isSelected
                  ? "bg-green-600 text-white"
                  : "border-gray-400 hover:bg-blue-100"
              }
            `}
    >
      <p>{label}</p>
      {hasFilters && (
        <i
          className={`bi bi-caret-down-fill text-sm transition-transform duration-300
                ${isSelected ? "rotate-180 text-white" : "text-gray-500"}
              `}
        />
      )}
    </li>
  );
};

export default CategoryItem;
