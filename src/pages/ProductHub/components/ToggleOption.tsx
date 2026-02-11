interface ToggleOptionProps {
  label: string;
  description: string;
  onToggle: () => void;
  checked: boolean;
  disabled?: boolean;
}

const ToggleOption = ({
  checked,
  onToggle,
  description,
  label,
  disabled = false,
}: ToggleOptionProps) => {
  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={onToggle}
        disabled={disabled}
        className={`cursor-pointer rounded-full w-4 h-4 flex items-center justify-center
          ${checked ? "bg-green-800" : "border text-green-800 border-green-800"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {checked && <i className="bi bi-check-lg text-white text-xs" />}
      </button>
      <div className="flex flex-col gap-1">
        <p className="text-sm">{label}</p>
        <p className="text-xs text-gray-500">{description} </p>
      </div>
    </div>
  );
};

export default ToggleOption;
