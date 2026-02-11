const CategoriesHelper = () => {
  return (
    <div className="grid grid-cols-[60px_1fr] bg-slate-100 border border-gray-300 rounded-xl p-4 gap-2">
      <div className="bg-emerald-200 text-emerald-600 rounded-xl h-12 w-12 flex justify-center items-center">
        <i className="bi bi-stars text-2xl" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">
          Por que categorias são importantes?
        </p>
        <p className="text-gray-500 text-sm">
          Categorias ajudam seus clientes a encontrar produtos mais rápido.
          <span className="font-medium">
            Adicione pelo menos uma categoria
          </span>
          (ex: Calçados, Roupas). Depois você pode adicionar subcategorias como
          marcas (Nike, Adidas). Isso melhora a experiência de compra!
        </p>
      </div>
    </div>
  );
};

export default CategoriesHelper;
