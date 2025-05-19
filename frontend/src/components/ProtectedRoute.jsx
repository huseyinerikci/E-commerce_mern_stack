import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, user, isAuth, loading }) => {
  const token = localStorage.getItem("token");

  // Bekleme durumu varsa hiçbir şey render etme
  if (loading) {
    return <div className="text-center mt-10">Yükleniyor...</div>;
  }

  if (!token || !isAuth) {
    return <Navigate to="/auth" />;
  }

  if (isAdmin && user?.role !== "admin") {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
