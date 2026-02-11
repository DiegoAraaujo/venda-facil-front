const StoreDescription = ({ description }: { description: string }) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-medium">Sobre a Loja</p>
      <p className=" text-gray-500">
        {description}
      </p>
    </div>
  );
};

export default StoreDescription;
