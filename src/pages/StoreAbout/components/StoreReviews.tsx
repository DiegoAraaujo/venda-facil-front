import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import ReviewCard from "../../../components/ReviewCard";
import { getLatestReviews } from "../../../services/review";
import type { Review } from "../../reviews/interface";
import DotLoader from "../../../components/DotLoader";

interface StoreReviewsProps {
  storeId: number;
}

const StoreReviews = ({ storeId }: StoreReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        setLoading(true);
        const data = await getLatestReviews(storeId);
        setReviews(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLatestReviews();
  }, [storeId]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium">Avaliações</p>

        {!loading && reviews.length > 0 && (
          <Link
            to={`/store/${storeId}/reviews`}
            className="flex gap-3 text-xs font-medium group hover:bg-emerald-50 rounded-xl px-6 py-2"
          >
            <span>Ver todas</span>
            <i className="bi bi-box-arrow-up-right group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {loading ? (
          <DotLoader message="Buscando avaliações da loja"/>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              profile_photo={review.profile_photo}
              authorName={review.author_name}
              comment={review.comment}
              rating={review.rating}
              createdAt={review.created_at}
            />
          ))
        ) : (
          <div className="flex flex-col items-center p-4 gap-2">
            <i className="bi bi-chat-square-text text-3xl text-gray-300" />
            <p className="text-gray-500 text-sm text-center font-medium">
              Esta loja ainda não recebeu avaliações. <br />
              Seja o primeiro a avaliar!
            </p>

            <Link
              to={`/store/${storeId}/reviews`}
              className="bg-emerald-600 text-white text-xs px-4 py-1 rounded-xl hover:-translate-y-0.5 transition-transform duration-300"
            >
              Avaliar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreReviews;
