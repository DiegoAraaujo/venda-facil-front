interface StoreBannerProps {
  storeName: string;
  profilePhoto: string;
  banner: String;
}

const StoreBanner = ({ storeName, banner, profilePhoto }: StoreBannerProps) => {
  return (
    <section
      className="w-full h-72 md:h-80 lg:h-96 relative border border-gray-300 overflow-hidden banner"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute bg-linear-to-l from-black/40 to-black/95 w-full h-full top-0 left-0 z-10"></div>

      <div className="z-20 relative max-w-7xl w-full m-auto p-4 flex flex-row items-end h-full gap-4">
        <div className="w-28 h-28">
          <img
            src={profilePhoto}
            alt={`Store profile picture: ${storeName}`}
            className="h-full object-cover rounded-2xl"
          />
        </div>

        <div className="flex-col gap-1 flex">
          <h1 className="text-3xl text-white font-semibold lg:text-4xl">
            {storeName}
          </h1>
          <p className=" text-white text-sm">Escolha, clique e tá com você.</p>
        </div>
      </div>
    </section>
  );
};

export default StoreBanner;
