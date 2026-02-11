const StorePortalTitle = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-center">
        Encontre sua
        <span className="bg-linear-to-r from-green-600  to-blue-900 text-transparent bg-clip-text block">
          loja favorita
        </span>
      </h1>
      <p className="text-gray-500 text-center">
        Busque pelo nome da loja e explore produtos incríveis de vendedores
        locais
      </p>
    </div>
  );
};

export default StorePortalTitle;
