interface TextInputFieldProps {
  id: string;
  label: string;
  value: string;
  placeHolder: string;
  type: string;
  icon?: string;
  onChange: (value: string) => void;
}

const TextInputField = ({
  id,
  label,
  value,
  onChange,
  placeHolder,
  type,
  icon,
}: TextInputFieldProps) => {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label htmlFor={id} className="text-sm flex gap-2 items-center">
        {icon && (
          <span>
            <i className={`bi ${icon}`} />
          </span>
        )}
        <span>{label}</span>
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg py-2 text-sm px-4 focus:outline-emerald-600"
        placeholder={placeHolder}
      />
    </div>
  );
};

export default TextInputField;
