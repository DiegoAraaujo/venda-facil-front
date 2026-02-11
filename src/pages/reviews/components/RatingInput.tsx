import React, { useState } from "react";

interface RatingInputProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const RatingInput = ({ rating, setRating }: RatingInputProps) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm">Sua avaliação</p>
      <div className="flex gap-2 text-2xl">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = hoverRating ? star <= hoverRating : star <= rating;

          return (
            <i
              key={star}
              className={`bi bi-star-fill cursor-pointer transition-colors duration-200 ${
                isActive ? "text-yellow-400" : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RatingInput;
