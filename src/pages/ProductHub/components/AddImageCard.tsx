const AddImageCard = () => {
  return (
    <label
      htmlFor="photos"
      className="cursor-pointer flex flex-col justify-center items-center border-2 border-dashed rounded-2xl border-gray-300 aspect-square text-gray-500 text-xs hover:-translate-y-0.5 duration-300 transition-transform group"
    >
      <i className="bi bi-upload text-2xl" />
      Adicionar
    </label>
  );
};

export default AddImageCard;
