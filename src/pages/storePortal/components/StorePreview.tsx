import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface StorePreviewProps {
  storeId: number;
  banner: string;
  profilePhoto: string;
  storeName: string;
  description: string;
  countProducts: number;
}

const StorePreview = ({
  banner,
  profilePhoto,
  storeName,
  description,
  countProducts,
  storeId,
}: StorePreviewProps) => {
  return (
    <motion.div
      className="max-w-100 w-full shadow-xl rounded-3xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <img
        src={banner}
        alt={`Store background image: ${storeName}`}
        className="w-full h-28 rounded-t-3xl object-cover"
      />
      <div className=" flex flex-col p-4 gap-2">
        <div className="flex gap-4 items-center">
          <div className="w-16 aspect-square">
            <img
              src={profilePhoto}
              alt={`Store profile picture: ${storeName}`}
              className="rounded-2xl aspect-square object-cover h-full w-full"
            />
          </div>
          <div>
            <p className="font-medium">{storeName}</p>
            <p className="text-xs text-gray-500 ">
              {countProducts} produtos disponíveis
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="flex px-4 pb-4 gap-4 items-center">
        <Link
          to={`/store/${storeId}/about`}
          className="bg-white text-emerald-600 rounded-full py-2 px-4 cursor-pointer hover:-translate-y-0.5 transition-transform duration-300 max-w-70 w-full flex gap-4 justify-center text-sm font-medium border-2 border-emerald-600"
        >
          <i className="bi bi-shop" />
          Sobre a loja
        </Link>
        <Link
          to={`/store/${storeId}/catalog/`}
          className="bg-emerald-600 text-white rounded-full py-2 px-4 cursor-pointer hover:-translate-y-0.5 transition-transform duration-300 max-w-70 w-full flex gap-4 justify-center group text-sm font-medium"
        >
          <i className="bi bi-eye" />
          Ver produtos
        </Link>
      </div>
    </motion.div>
  );
};

export default StorePreview;
