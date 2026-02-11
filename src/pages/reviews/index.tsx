import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import ReviewCard from "../../components/ReviewCard";
import { getReviews, getReviewStats } from "../../services/review";
import { useStore } from "../../hooks/UseStore";
import { toast } from "sonner";
import type { Review, ReviewStats } from "./interface";
import ReviewsSummary from "./components/ReviewsSummary";
import ReviewsHeader from "./components/ReviewsHeader";
import NoReviews from "../../assets/no-reviews.png";
import NewReviewModal from "./components/NewReviewModal";
import type { PaginationMeta } from "../../interfaces/paginationMeta";
import EmptyState from "../../components/EmptyState";
import PageSkeleton from "../../components/PageSkeleton";
const Reviews = () => {
  const { store } = useStore();
  const [page, setPage] = useState<number>(0);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(
    null,
  );

  if (!store) return null;

  const fetchStats = async () => {
    try {
      const stats = await getReviewStats(store.id);
      setStats(stats);
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message);
    }
  };

  const fetchReviews = async (pageNumber = page) => {
    try {
      setLoading(true);
      const reviews = await getReviews(store.id, pageNumber + 1);
      setReviews(reviews.data);
      setPaginationMeta(reviews.meta);
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [store.id]);

  useEffect(() => {
    fetchReviews(page);
  }, [store.id, page]);

  return (
    <div className="w-full  flex flex-col gap-4 flex-1 p-4 md:p-8">
      {stats && (
        <ReviewsHeader
          totalReviews={stats.reviewsCount}
          openModal={() => setIsOpen(true)}
        />
      )}
      {stats &&
        stats?.averageRating > 0 &&
        stats?.ratingDistribution.length > 0 && (
          <ReviewsSummary
            averageRating={stats.averageRating}
            ratingDistribution={stats.ratingDistribution}
          />
        )}
      {loading && reviews.length === 0 ? (
        <div className="flex flex-1 justify-center items-center">
          <PageSkeleton message="Buscando as avaliações dos nossos clientes" />
        </div>
      ) : (
        <div
          className={`flex flex-col gap-4 flex-1 transition-opacity duration-300 ${
            loading ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard
                key={review.id}
                authorName={review.author_name}
                comment={review.comment}
                createdAt={review.created_at}
                rating={review.rating}
                profile_photo={review.profile_photo}
              />
            ))
          ) : (
            <EmptyState
              title="Nenhuma avaliação encontrada"
              description="Ainda não há comentários sobre este produto. Seja o primeiro a deixar sua opinião!"
            >
              <img
                src={NoReviews}
                alt="Nenhuma avaliação disponível"
                className="w-52 rounded-2xl"
              />
            </EmptyState>
          )}
        </div>
      )}

      {paginationMeta &&
        (paginationMeta.hasNextPage || paginationMeta.hasPrevPage) && (
          <Pagination
            page={page}
            setPage={(value) => {
              if (loading) return;
              setPage(value);
            }}
            total={paginationMeta.totalPages}
          />
        )}

      {isOpen && (
        <div
          className="fixed bg-black/40 w-full min-h-dvh right-0 top-0 z-40 backdrop-blur cursor-pointer flex justify-center items-center"
          onClick={() => setIsOpen(false)}
        >
          <NewReviewModal
            closeModal={() => setIsOpen(false)}
            onReviewAdded={() => {
              setPage(0);
              fetchStats();
              fetchReviews(0);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Reviews;
