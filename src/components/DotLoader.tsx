interface DotLoaderProps {
  message: string;
}

const DotLoader = ({message}:DotLoaderProps) => {
  return (
    <div className=" flex justify-center gap-4 items-center p-4">
      <p className="text-sm  text-gray-500">{message}</p>
      <div className="flex items-end gap-1 h-3 ">
        <span className="dot dot-1 bg-gray-500 rounded-full w-1 h-1" />
        <span className="dot dot-2 bg-gray-500 rounded-full w-1 h-1" />
        <span className="dot dot-3 bg-gray-500 rounded-full w-1 h-1" />
      </div>
    </div>
  );
};

export default DotLoader;
