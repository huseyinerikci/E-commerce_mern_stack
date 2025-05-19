import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { FiEdit } from "react-icons/fi";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuth, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuth) {
      navigate("/auth");
    } else if (!user) {
      dispatch(profile());
    }
  }, [dispatch, isAuth, navigate, user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-8">
        <div>
          <img
            className="w-[200px] h-[200px] rounded-full object-cover border-4 border-blue-500"
            src={user?.avatar?.url || "/profile.png"}
            alt="avatar"
          />
        </div>
        <div className="flex-1 space-y-3 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-xl text-gray-600">{user?.email}</p>
          <Button
            text={
              <span className="flex items-center justify-center gap-2">
                <FiEdit /> Profili Güncelle
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
