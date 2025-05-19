import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Detail from "./pages/Detail";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "./redux/slice/userSlice";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import { hydrateCart } from "./redux/slice/cartSlice";
const App = () => {
  const { user, isAuth, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuth) {
      dispatch(profile());
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    if (isAuth) {
      dispatch(hydrateCart()); // Kullanıcı giriş yaptıysa sepeti localStorage'tan yeniden yükle
    }
  }, [isAuth, dispatch]);
  if (loading) {
    return <div className="text-center mt-10">Yükleniyor...</div>;
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          element={
            <ProtectedRoute
              isAuth={isAuth}
              isAdmin={false}
              user={user}
              loading={loading}
            />
          }
        >
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              isAuth={isAuth}
              isAdmin={true}
              user={user}
              loading={loading}
            />
          }
        >
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
