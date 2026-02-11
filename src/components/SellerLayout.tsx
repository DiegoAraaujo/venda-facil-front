import { Outlet, Navigate } from "react-router-dom";
import SellerHeader from "./SellerHeader";
import SellerSidebar from "./SellerSidebar";
import { useAuth } from "../hooks/UseAuth";
import PageSkeleton from "./PageSkeleton";

const SellerLayout = () => {
  const { isLoggedIn, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return <PageSkeleton message="Verificando autenticação" />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="grid lg:grid-cols-[250px_1fr] h-dvh">
      <SellerSidebar />
      <div className="overflow-y-auto flex flex-col relative">
        <SellerHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default SellerLayout;
