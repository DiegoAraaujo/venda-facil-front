import { useState } from "react";
import { confirmToast } from "./confirmDeleteCategory";
import { toast } from "sonner";

interface ListItemHeaderProps {
  categoryId: number;
  categoryName: string;
  subCategoriescount: number;
  onToggleBody: () => void;
  isExpanded: boolean;
  onDelete: () => void;
  onUpdateCategory: (id: number, newName: string) => void;
}

const ListItemHeader = ({
  categoryId,
  categoryName,
  subCategoriescount,
  onToggleBody,
  isExpanded,
  onDelete,
  onUpdateCategory,
}: ListItemHeaderProps) => {
  const [newName, setNewName] = useState<string>("");
  const [editMod, setEditMod] = useState<boolean>(false);

  const handleConfirmEdit = () => {
    if (!newName.trim()) {
      toast.warning("O nome não pode ser vazio");
      return;
    }

    if (newName.trim() === categoryName) {
      toast.warning("Nenhuma alteração foi feita no nome");
      return;
    }

    onUpdateCategory(categoryId, newName.trim());
    setEditMod(false);
  };

  return (
    <div className="flex justify-between bg-gray-50 p-4 rounded-xl gap-2">
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
        <div className="flex flex-col">
          <p className="text-sm font-medium">{categoryName}</p>
          <p className="text-xs text-gray-500">
            {subCategoriescount} subcategorias
          </p>
        </div>
      )}
      {!editMod && (
        <span className="flex gap-3 items-center">
          {!editMod && (
            <i
              className="bi bi-pencil-square cursor-pointer"
              onClick={() => {
                setNewName(categoryName);
                setEditMod(true);
              }}
            />
          )}
          <i
            className="bi bi-trash text-red-500 cursor-pointer"
            onClick={() =>
              confirmToast({
                title: "Deseja realmente excluir esta categoria?",
                description:
                  "Os produtos associados a ela não aparecerão mais no catálogo.",
                confirmLabel: "Excluir",
                variant: "danger",
                onConfirm: () => {
                  onDelete();
                  toast.success("Categoria excluída com sucesso!");
                },
              })
            }
          />
          <i
            className={`bi bi-caret-down transition-transform duration-300 cursor-pointer ${isExpanded ? "rotate-180" : "rotate-0"}`}
            onClick={onToggleBody}
          />
        </span>
      )}
    </div>
  );
};

export default ListItemHeader;
