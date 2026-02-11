import { BrowserRouter, Route, Routes } from "react-router-dom";
import Catalog from "./pages/catalog";
import StoreAbout from "./pages/StoreAbout";
import { CartContextProvider } from "./context/CartContext";
import { StoreContextProvider } from "./context/StoreContext";
import { Toaster } from "sonner";
import StorePortal from "./pages/storePortal";
import ClientLayout from "./components/ClientLayout";
import ProductHub from "./pages/ProductHub";
import Reviews from "./pages/reviews";
import CreateStore from "./pages/createStore";
import Login from "./pages/login";
import SellerDashboard from "./pages/SellerDashboard";
import SellerLayout from "./components/SellerLayout";
import SellerOrders from "./pages/orders";
import SellerProducts from "./pages/SellerProducts";
import Categories from "./pages/categories";
import { AuthContextProvider } from "./context/AuthConntext";
import Settings from "./pages/settings";

const App = () => {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Toaster richColors position="top-right" />

        <Routes>
          <Route path="/" element={<StorePortal />} />
          <Route path="/create-store" element={<CreateStore />} />

          <Route
            path="/login"
            element={
              <AuthContextProvider>
                <Login />
              </AuthContextProvider>
            }
          />
          <Route
            path="/seller"
            element={
              <AuthContextProvider>
                <SellerLayout />
              </AuthContextProvider>
            }
          >
            <Route path="new-product" element={<ProductHub />} />
            <Route path="dashboard" element={<SellerDashboard />} />
            <Route path="orders" element={<SellerOrders />} />
            <Route path="products" element={<SellerProducts />} />
            <Route path="categories" element={<Categories />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route
            path="/store/:storeId"
            element={
              <StoreContextProvider>
                <ClientLayout />
              </StoreContextProvider>
            }
          >
            <Route path="catalog" element={<Catalog />} />
            <Route path="about" element={<StoreAbout />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </CartContextProvider>
    </BrowserRouter>
  );
};

export default App;
