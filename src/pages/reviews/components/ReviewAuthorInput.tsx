interface ReviewAuthorInputProps {
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
}

const ReviewAuthorInput = ({ setAuthor }: ReviewAuthorInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="name" className="text-sm">
        Seu nome *
      </label>
      <input
        onChange={(e) => setAuthor(e.target.value)}
        type="text"
        id="name"
        placeholder="Digite seu nome"
        className="border border-gray-300 rounded-xl text-sm px-4 py-2 focus:outline-none"
        maxLength={100}
      />
    </div>
  );
};

export default ReviewAuthorInput;
