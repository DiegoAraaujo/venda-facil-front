import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface TabletMenuProps {
  onClose: () => void;
  storeId: number;
}

const TabletMenu = ({ onClose, storeId }: TabletMenuProps) => {
  return (
    <motion.div
      className="absolute top-full left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-30"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-4 p-6">
        <Link
          to={`/store/${storeId}/catalog`}
          onClick={onClose}
          className="text-gray-700 font-medium"
        >
          Catálogo
        </Link>

        <Link
          to={`/store/${storeId}/about`}
          onClick={onClose}
          className="text-gray-700 flex gap-2 items-center font-medium"
        >
          <i className="bi bi-shop" /> Sobre a Loja
        </Link>
      </div>
    </motion.div>
  );
};

export default TabletMenu;
