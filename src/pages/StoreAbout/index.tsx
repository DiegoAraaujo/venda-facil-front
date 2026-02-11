import { Link } from "react-router-dom";
import StoreContact from "./components/StoreContact";
import StoreDescription from "./components/StoreDescription";
import StoreInfo from "./components/StoreInfo";
import StoreReviews from "./components/StoreReviews";
import StoreStats from "./components/StoreStats";
import { useStore } from "../../hooks/UseStore";
import StoreBanner from "./components/StoreBanner";

const StoreAbout = () => {
  const { store } = useStore();

  if (!store) return null;

  return (
    <section className="flex flex-col w-full">
      <StoreBanner
        banner={store.banner}
        storeName={store.name}
        profilePhoto={store.profile_photo}
      />
      <div className="w-full p-4 md:p-8 lg:grid lg:grid-cols-[1fr_400px] gap-4 grid">
        <div className="flex flex-col gap-4">
          <StoreDescription description={store.description} />
          <StoreStats storeId={store.id}/>
          <StoreReviews storeId={store.id}/>
        </div>
        <div>
          <div className="border border-gray-300 rounded-xl p-4 flex flex-col gap-4">
            <StoreContact
              instagram={store.instagram}
              whatsApp={store.whatsApp}
            />
            <hr className="text-gray-300" />
            <StoreInfo
              address={store.address}
              business_hours={store.business_hours}
            />
            <hr className="text-gray-300" />
            <Link
              to={`/store/${store.id}/catalog`}
              className="text-white font-medium rounded-xl bg-emerald-600 p-3 flex gap-3 justify-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-300"
            >
              <i className="bi bi-bag" /> Ver Produtos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreAbout;
