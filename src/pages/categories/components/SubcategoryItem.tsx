import { useState } from "react";
import { toast } from "sonner";
import { confirmToast } from "./confirmDeleteCategory";

interface SubcategoryItemProps {
  subcategoryId: number;
  subcategoryName: string;
  onDeleteSubcategory: () => void;
  onUpdateSubcategory: (id: number, newName: string) => void;
}

const SubcategoryItem = ({
  subcategoryId,
  subcategoryName,
  onDeleteSubcategory,
  onUpdateSubcategory,
}: SubcategoryItemProps) => {
  const [newName, setNewName] = useState<string>("");
  const [editMod, setEditMod] = useState<boolean>(false);

  const handleConfirmEdit = () => {
    if (!newName.trim()) {
      toast.warning("O nome não pode ser vazio");
      return;
    }

    if (newName.trim() === subcategoryName) {
      toast.warning("Nenhuma alteração foi feita no nome");
      return;
    }

    onUpdateSubcategory(subcategoryId, newName.trim());
    setEditMod(false);
  };
  return (
    <div className="text-gray-500 text-sm  border border-gray-200 rounded-xl px-4 py-1">
      {editMod ? (
        <div className=" flex gap-2 items-center">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            type="text"
            placeholder="Novo nome da categoria"
            className="border border-gray-200 rounded-xl px-4 py-1 text-sm focus:outline-emerald-600"
          />
          <i
            onClick={() => setEditMod(false)}
            className="bi bi-x text-red-500 cursor-pointer"
          />
          <i
            onClick={handleConfirmEdit}
            className="bi bi-check text-green-500 cursor-pointer"
          />
        </div>
      ) : (
        <div className="flex gap-2">
          <span>{subcategoryName}</span>
          <i
            onClick={() => {
              setNewName(subcategoryName);
              setEditMod(true);
            }}
            className="bi bi-pencil-square cursor-pointer"
          />
          <i
            className="bi bi-trash text-red-500 cursor-pointer"
            onClick={() =>
              confirmToast({
                title: "Deseja realmente excluir esta subcategoria?",
                confirmLabel: "Excluir",
                variant: "danger",
                onConfirm: () => {
                  onDeleteSubcategory();
                  toast.success("subcategoria excluída com sucesso!");
                },
              })
            }
          />
        </div>
      )}
    </div>
  );
};

export default SubcategoryItem;
