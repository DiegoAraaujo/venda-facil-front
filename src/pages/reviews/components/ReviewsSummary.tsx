import type { RatingDistribution } from "../interface";
import RatingBadge from "./RatingBadge";
import StarRating from "./StarRating";

interface ReviewsSummaryProps {
  averageRating: number;
  ratingDistribution: RatingDistribution[];
}

const ReviewsSummary = ({
  averageRating,
  ratingDistribution,
}: ReviewsSummaryProps) => {
  return (
    <div className="shadow-md border border-gray-200 p-4 rounded-xl flex flex-col gap-4 lg:justify-between lg:items-center lg:flex-row">
      <div className="flex gap-4 items-center">
        <p className="text-4xl font-bold">{averageRating.toFixed(1)}</p>
        <div className=" felx flex-col gap-1">
          <StarRating rating={averageRating} />
          <p className="text-xs text-gray-500">Média das avaliações</p>
        </div>
      </div>

      <div className="flex gap-2 items-center flex-wrap">
        {ratingDistribution.map((r) => (
          <RatingBadge
            numberAvaliations={r._count.rating}
            numberStars={r.rating}
            key={r.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsSummary;
