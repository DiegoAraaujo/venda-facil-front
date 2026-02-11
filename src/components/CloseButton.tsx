interface CloseButtonProps {
  onClick: () => void;
}
const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button
      onClick={onClick}
      className=" rounded-full w-8 h-8 justify-center items-center flex bg-gray-100 cursor-pointer hover:scale-105 transition-transform duration-300"
    >
      <i className="bi bi-x  text-xl " />
    </button>
  );
};

export default CloseButton;
