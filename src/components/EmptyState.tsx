import type { ReactNode } from "react";
import Button from "./Button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  children?: ReactNode;
}

const EmptyState = ({
  title,
  description,
  buttonText,
  onButtonClick,
  children,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center flex-1  justify-center gap-2">
      <div>
        <p className="text-sm font-semibold text-center">{title}</p>
        <p className="text-gray-500 text-xs text-center max-w-96">
          {description}
        </p>
      </div>
      {children}
      {buttonText && onButtonClick && (
        <Button onClick={onButtonClick}>{buttonText}</Button>
      )}
    </div>
  );
};

export default EmptyState;
