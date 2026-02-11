const StarRating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;
    if (rating >= value)
      return <i key={i} className="bi bi-star-fill text-yellow-400" />;
    if (rating >= value - 0.5)
      return <i key={i} className="bi bi-star-half text-yellow-400" />;
    return <i key={i} className="bi bi-star text-yellow-400" />;
  });

  return <span className="text-xl font-bold flex gap-1">{stars}</span>;
};

export default StarRating;
