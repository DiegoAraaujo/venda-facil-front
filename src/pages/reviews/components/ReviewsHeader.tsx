interface ReviewsHeaderProps {
  totalReviews: number;
  openModal: () => void;
}

const ReviewsHeader = ({ totalReviews, openModal }: ReviewsHeaderProps) => {
  return (
    <div className="flex gap-4 justify-between items-center">
      <div className="flex gap-4">
        <span className="bg-emerald-50 w-12 h-12 rounded-xl flex justify-center items-center">
          <i className="bi bi-chat-left text-xl" />
        </span>
        <span>
          <h1 className="text-lg font-semibold">Todas as Avaliações</h1>
          <p className="text-gray-500 text-sm">{totalReviews} Avaliações</p>
        </span>
      </div>
      <button
        className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-300 bg-emerald-600 text-white rounded-xl px-6 py-1"
        onClick={openModal}
      >
        Avaliar
      </button>
    </div>
  );
};

export default ReviewsHeader;
