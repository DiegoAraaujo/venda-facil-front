import { useEffect, useState } from "react";
import TextAreaInput from "../../../components/TextAreaInput";
import RatingInput from "./RatingInput";
import ReviewAuthorInput from "./ReviewAuthorInput";
import ReviewPhotoUpload from "./ReviewPhotoUpload";
import ReviewModalHeader from "./ReviewModalHeader";
import { useStore } from "../../../hooks/UseStore";
import { toast } from "sonner";
import { createReview } from "../../../services/review";
import Button from "../../../components/Button";

interface NewReviewModalProps {
  closeModal: () => void;
  onReviewAdded: () => void;
}

const NewReviewModal = ({ closeModal, onReviewAdded }: NewReviewModalProps) => {
  const { store } = useStore();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!store) return null;

  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!author.trim())
      return toast.warning("Informe o seu nome para continuar");
    if (rating < 1 || rating > 5)
      return toast.warning("Você deve avaliar em 1, 2,3,4 ou 5 estrelas");

    const formData = new FormData();
    formData.append("author_name", author);
    formData.append("rating", String(rating));
    if (comment.trim()) formData.append("comment", comment);
    if (image) formData.append("profile_photo", image);

    try {
      setIsSubmitting(true);
      await createReview(store.id, formData);
      toast.success("Obrigado por sua avaliação!");
      setAuthor("");
      setComment("");
      setImagePreview("");
      setImage(null);
      setRating(0);
      onReviewAdded();
      closeModal();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-xl max-w-xl w-full flex flex-col gap-4 border border-gray-300 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={closeModal}
        type="button"
        className=" bg-red-500 text-white rounded-full w-8 h-8 absolute top-2 right-2 cursor-pointer hover:-translate-y-0.5 transition-transform duration-300"
      >
        <i className="bi bi-x text-2xl" />
      </button>
      <ReviewModalHeader />
      <ReviewPhotoUpload
        imagePreview={imagePreview.trim()}
        setImage={setImage}
      />
      <ReviewAuthorInput setAuthor={setAuthor} />
      <RatingInput rating={rating} setRating={setRating} />
      <TextAreaInput
        value={comment}
        onChangeContent={setComment}
        label="Seu comentário"
        id="comment"
        placeHolder="Conte sua experiência com a loja..."
      />
      <Button isLoading={isSubmitting} loadingText="Enviando" type="submit">
        Enviar avaliação
      </Button>
    </form>
  );
};

export default NewReviewModal;
