import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../components/Input";
import Button from "../components/Button";

const Auth = () => {
  const [signUp, setSignUp] = useState(true);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    file: "",
  });
  const [preview, setPreview] = useState("/profile.png");

  const registerFunc = () => {};
  const loginFunc = () => {};
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-1/3 -mt-10 border p-4 rounded-md ">
        <div className="text-2xl text-center">
          {signUp ? "Kayıt Ol" : "Giriş Yap"}
        </div>
        {signUp && (
          <Input type={"text"} name={"name"} id={""} placeholder={"Ad"} />
        )}
        <Input type={"text"} name={"email"} id={""} placeholder={"Email"} />
        <Input
          type={"password"}
          name={"password"}
          id={""}
          placeholder={"Şifre"}
        />
        {signUp && (
          <div className="flex items-center gap-2">
            <img
              className="w-10 h-10 rounded-full"
              src={preview}
              alt="preview"
            />
            <Input type={"file"} name={"avatar"} id={""} placeholder={""} />
          </div>
        )}
        <div
          className="text-red-500 my-2 text-sm cursor-pointer"
          onClick={() => setSignUp(!signUp)}
        >
          {signUp ? " Hesabınız varsa Giriş Yap" : " Hesabınız yoksa Kayıt Ol"}
        </div>
        <Button
          text={signUp ? "Kayıt Ol" : "Giriş Yap"}
          onClick={signUp ? registerFunc : loginFunc}
        />
      </div>
    </div>
  );
};

export default Auth;
