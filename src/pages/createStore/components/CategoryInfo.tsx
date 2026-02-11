interface CategoryInfoProps {
  categoryName: string;
  numberSubcategories: number;
}

const CategoryInfo = ({
  categoryName,
  numberSubcategories,
}: CategoryInfoProps) => {
  return (
    <div className="flex gap-4">
      <span className="bg-slate-200 w-8 h-8 rounded-xl flex justify-center items-center">
        <i className="bi bi-tags text-emerald-600"></i>
      </span>
      <span>
        <p className="">{categoryName}</p>
        <p className=" text-gray-500 text-sm">
          {numberSubcategories} subcategoria(s)
        </p>
      </span>
    </div>
  );
};

export default CategoryInfo;
