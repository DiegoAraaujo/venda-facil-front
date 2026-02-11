interface RatingBadgeProps {
  numberStars: number;
  numberAvaliations: number;
}
const RatingBadge = ({ numberStars, numberAvaliations }: RatingBadgeProps) => {
  return (
    <p className="text-xs text-white bg-yellow-600 rounded-xl px-4 py-1 flex gap-1">
      <i className="bi bi-star-fill text-yellow-400"></i>{numberStars} estrelas:
      <span className="font-medium">{numberAvaliations}</span>
    </p>
  );
};

export default RatingBadge;
