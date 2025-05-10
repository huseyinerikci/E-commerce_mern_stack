import React, { useState } from "react";
import { SlBasket } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getKeyword } from "../redux/slice/generalSlice";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { user, isAuth } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const keywordFunc = () => {
    dispatch(getKeyword(keyword));
    setKeyword("");
    navigate("/products");
  };
  const menuFunc = (item) => {
    if (item == "Çıkış") {
      localStorage.clear();
      window.location = "/";
    } else {
      window.location = item.url;
    }
  };

  const menuItems = [
    {
      name: "Profil",
      url: "/profile",
    },
    {
      name: "Admin",
      url: "/admin",
    },
    {
      name: "Çıkış",
      url: "/logout",
    },
  ];
  return (
    <div className="bg-gray-100 h-16 px-5 flex items-center justify-between">
      <div className="text-4xl">e.com</div>
      <div className="flex items-center gap-5">
        <div className="flex items-center">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="p-2 outline-none bg-white"
            type="text"
            placeholder="Arama yap"
          />
          <div
            onClick={keywordFunc}
            className="p-2 ml-1 bg-white cursor-pointer"
          >
            Ara
          </div>
        </div>
        <div className="relative">
          <img
            onClick={() => setOpenMenu(!openMenu)}
            src={user?.user ? user?.user?.avatar?.url : "/profile.png"}
            alt="profil"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
          {openMenu && (
            <div className="absolute right-0 mt-3 w-[200px] bg-white shadow-lg shadow-gray-400 z-1">
              {menuItems.map((item, key) => (
                <div
                  onClick={() => menuFunc(item)}
                  key={key}
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div onClick={() => navigate("/cart")} className="relative">
          <SlBasket size={30} />
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            {carts?.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
