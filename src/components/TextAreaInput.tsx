import { useState } from "react";

interface TextAreaInputProps {
  onChangeContent: (value: string) => void;
  label: string;
  id: string;
  placeHolder: string;
  value: string;
}

const TextAreaInput = ({
  onChangeContent,
  label,
  id,
  value,
  placeHolder,
}: TextAreaInputProps) => {
  const [contentLength, setContentLength] = useState(0);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>

      <textarea
        id={id}
        maxLength={300}
        placeholder={placeHolder}
        className="border border-gray-300 rounded-xl p-4 focus:outline-none text-sm h-32"
        onChange={(e) => {
          onChangeContent(e.target.value);
          setContentLength(e.target.value.length);
        }}
        value={value}
      />

      <p className="text-gray-500 text-xs text-right">
        {contentLength}/300 caracteres
      </p>
    </div>
  );
};

export default TextAreaInput;
