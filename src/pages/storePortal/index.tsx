import Header from "./components/Header";
import HighlightMessage from "./components/HighlightMessage";
import StorePortalTitle from "./components/StorePortalTitle";
import SearchBar from "./components/SearchBar";
import ActionButtons from "./components/ActionButtons";
import StorePreview from "./components/StorePreview";
import { useState } from "react";
import { toast } from "sonner";
import { getStorePreviewByName } from "../../services/store";

interface StorePreviewData {
  id: number;
  name: string;
  description: string;
  banner: string;
  profile_photo: string;
  productCount: number;
}

const StorePortal = () => {
  const [storeName, setStoreName] = useState<string>("");
  const [storeData, setStoreData] = useState<null | StorePreviewData>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getStorePreview = async () => {
    if (!storeName) {
      return toast.error("Digite o nome de uma loja primeiro!");
    }
    setLoading(true);

    try {
      const store = await getStorePreviewByName(storeName);
      setStoreData(store);
      setLoading(false);
    } catch (error: unknown) {
      setLoading(false)
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <section>
      <Header />
      <div className="max-w-xl w-full m-auto p-4 gap-6 flex flex-col items-center">
        <HighlightMessage />
        <StorePortalTitle />
        <SearchBar
          setStoreName={setStoreName}
          onSearch={() => getStorePreview()}
          loading={loading}
        />
        {storeData && (
          <StorePreview
            storeName={storeData.name}
            banner={storeData.banner}
            description={storeData.description}
            profilePhoto={storeData.profile_photo}
            countProducts={storeData.productCount}
            storeId={storeData.id}
          />
        )}
        <ActionButtons />
      </div>
    </section>
  );
};

export default StorePortal;
