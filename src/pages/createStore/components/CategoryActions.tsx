interface CategoryActionsProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  removeCategory: () => void;
}

const CategoryActions = ({
  visible,
  setVisible,
  removeCategory,
}: CategoryActionsProps) => {
  return (
    <div className="flex gap-4">
      <i
        onClick={removeCategory}
        className="bi bi-x text-red-700 hover:bg-red-100 rounded-xl cursor-pointer px-3 py-1 text-xl"
      />
      <i
        onClick={() => setVisible(!visible)}
        className={`bi bi-caret-down transition-transform duration-400 ${
          visible ? "rotate-180" : "rotate-0"
        } text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer px-3 py-1 text-xl`}
      />
    </div>
  );
};

export default CategoryActions;
