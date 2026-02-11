import { motion } from "framer-motion";

interface PageSkeletonProps {
  message: string;
}

const PageSkeleton = ({ message }: PageSkeletonProps) => {
  return (
    <div className=" flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-8 h-8 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
          </div>

          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="relative w-full h-full">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-400" />
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-2"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="relative w-full h-full">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-300" />
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <div className="relative w-full h-full">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-200" />
            </div>
          </motion.div>

          <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/40 animate-spin [animation-duration:8s]" />
        </div>

        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default PageSkeleton;
