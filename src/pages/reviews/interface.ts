export type RatingDistribution = {
  rating: number;
  _count: {
    rating: number;
  };
};

export interface ReviewStats {
  averageRating: number;
  reviewsCount: number;
  ratingDistribution: RatingDistribution[];
}

export interface Review {
  author_name: string;
  id: number;
  rating: number;
  comment: string | null;
  profile_photo: string | null;
  created_at: string;
}
