import Button from "../../../components/Button";

interface SearchBarProps {
  setStoreName: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
  loading: boolean;
}

const SearchBar = ({ setStoreName, onSearch, loading }: SearchBarProps) => {
  return (
    <div className="flex border border-gray-300 shadow-md rounded-3xl py-2 items-center px-4 gap-4 w-full">
      <i className="bi bi-search text-gray-500 text-lg sm:block hidden" />
      <input
        type="text"
        name="store-name"
        id="store-name"
        className="flex-1 focus:outline-0 min-w-0"
        placeholder="Digite o nome da Loja..."
        onChange={(e) => setStoreName(e.target.value)}
      />
      <Button isLoading={loading} loadingText="Buscando" onClick={onSearch}>
        Buscar
      </Button>
    </div>
  );
};

export default SearchBar;
