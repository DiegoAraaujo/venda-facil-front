interface ProductInfoProps {
  image: string;
  id: number;
  stock: number;
}

const ProductInfo = ({ image, id, stock }: ProductInfoProps) => (
  <div className="flex gap-4 items-center">
    <div className="w-24 aspect-square">
      <img
        src={image}
        alt=""
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
    <div className="flex flex-col gap-1 text-gray-500 text-sm">
      <p>ID: {id}</p>
      <p>
        Estoque total:{" "}
        <span className="text-gray-900 font-medium">{stock}</span>
      </p>
    </div>
  </div>
);

export default ProductInfo;
