import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPassword } from "../redux/slice/userSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { token } = useParams();

  const forgotFunc = () => {
    let res = dispatch(resetPassword(token.password));
    console.log(res);
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-1/3 space-y-3 border p-10 -mt-25">
        <div className="text-3xl">Yeni Şifre Oluştur</div>
        <Input
          placeholder={"Yeni şifre gir"}
          onChange={(e) => setPassword(e.target.value)}
          name={"password"}
          id={""}
          type={"password"}
        />
        <Button text={"Onayla"} onClick={forgotFunc} />
      </div>
    </div>
  );
};

export default ResetPassword;
