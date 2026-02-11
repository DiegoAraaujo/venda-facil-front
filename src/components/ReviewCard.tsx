import { formatDate } from "../utils/formatDate";

interface ReviewCardProps {
  authorName: string;
  profile_photo?: string | null;
  comment: string | null;
  rating: number;
  createdAt: string;
}

const ReviewCard = ({
  authorName,
  comment,
  rating,
  createdAt,
  profile_photo,
}: ReviewCardProps) => {
  return (
    <div className="flex gap-4  border rounded-xl border-gray-300 p-4">
      {profile_photo ? (
        <div className="rounded-full w-14 h-14">
          <img
            src={profile_photo}
            alt="profile photo"
            className="object-cover h-full w-full rounded-full"
          />
        </div>
      ) : (
        <i className="bi bi-person-circle text-5xl"></i>
      )}
      <div className="flex flex-col gap-1 grow">
        <div className="flex gap-2 items-center justify-between">
          <p className="text-sm font-semibold truncate max-w-37.5 lg:max-w-none">
            {authorName}
          </p>
          <p className="text-gray-500 text-xs">{formatDate(createdAt)}</p>
        </div>

        {comment && <p className="text-gray-500 text-sm">{comment}</p>}
        <div className="flex gap-1">
          <div className="flex gap-1">
            {Array.from({ length: rating }).map((_, index) => {
              return (
                <i
                  key={index}
                  className="bi bi-star-fill text-yellow-500 text-xs"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
