import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import { profile } from "../redux/slice/userSlice";
import { useEffect } from "react";

const Profile = () => {
  const { user, isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profile());
  }, []);
  return (
    <div className="min-h-screen">
      <div className="flex justify-center  gap-5 my-10">
        <div>
          <img
            className="w-[300px] h-[300px] rounded-full"
            src={user?.user?.avatar?.url || "/profile.png"}
            alt="avatar"
          />
        </div>
        <div className="space-y-2">
          <div className="text-4xl font-bold">{user?.user?.name}</div>
          <div className="text-3xl ">{user?.user?.email}</div>
          <Button text={"Profili Güncelle"} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
