interface ButtonProps {
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  loadingText?: string;
}

const Button = ({
  isLoading = false,
  type = "button",
  onClick,
  children,
  loadingText,
}: ButtonProps) => (
  <button
    onClick={onClick}
    type={type}
    disabled={isLoading}
    className={`cursor-pointer font-semibold text-sm p-2 rounded-xl transition-all duration-300 ${
      isLoading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-emerald-600 text-white hover:-translate-y-0.5"
    }`}
  >
    {isLoading ? (
      <div className="flex items-center justify-center gap-2">
        <i className="bi bi-arrow-repeat animate-spin" />
        {loadingText && `${loadingText}...`}
      </div>
    ) : (
      children
    )}
  </button>
);

export default Button;
