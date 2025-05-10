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
const App = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />

        <Route element={<ProtectedRoute isAdmin={false} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} user={user} />}>
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
