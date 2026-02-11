import { toast } from "sonner";

interface ConfirmToastProps {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
  onConfirm: () => void;
}

export const confirmToast = ({
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  variant = "default",
  onConfirm,
}: ConfirmToastProps) => {
  toast(
    <div className="flex flex-col gap-3">
      <p className="font-medium text-sm">{title}</p>

      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      <div className="flex justify-end gap-2 mt-2">
        <button
          className="cursor-pointer px-3 py-1 text-sm rounded-md border border-gray-300"
          onClick={() => toast.dismiss()}
        >
          {cancelLabel}
        </button>

        <button
          className={`cursor-pointer px-3 py-1 text-sm rounded-md text-white
            ${variant === "danger" ? "bg-red-500" : "bg-blue-500"}
          `}
          onClick={() => {
            toast.dismiss();
            onConfirm();
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
};
