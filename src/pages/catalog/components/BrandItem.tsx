interface BrandItemProps {
  label: string;
  value: number | null;
  isSelected: boolean;
  setSubCategorySelected: React.Dispatch<
    React.SetStateAction<number | null>
  >;
}

const BrandItem = ({
  label,
  value,
  isSelected,
  setSubCategorySelected,
}: BrandItemProps) => {
  return (
    <div>
      <li
        onClick={() => setSubCategorySelected(value)}
        className={`${
          isSelected
            ? "bg-green-100 text-green-600 border border-green-300"
            : "bg-gray-100 text-gray-500"
        }  px-4 py-1 rounded-xl  text-xs sm:text-sm cursor-pointer text-center`}
      >
        {label}
      </li>
    </div>
  );
};

export default BrandItem;
