import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Button from "../components/Button";
import { login, register } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [signUp, setSignUp] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuth } = useSelector((state) => state.user);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [preview, setPreview] = useState("/profile.png");

  const registerFunc = () => {
    dispatch(register(data));
  };
  const loginFunc = () => {
    dispatch(login(data));
  };

  const handleChange = (e) => {
    if (e.target.name == "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setData((prev) => ({ ...prev, avatar: reader.result }));
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-1/3 -mt-10 border p-4 rounded-md ">
        <div className="text-2xl text-center">
          {signUp ? "Kayıt Ol" : "Giriş Yap"}
        </div>
        {signUp && (
          <Input
            onChange={handleChange}
            value={data.name}
            type={"text"}
            name={"name"}
            id={""}
            placeholder={"Ad"}
          />
        )}
        <Input
          onChange={handleChange}
          value={data.email}
          type={"text"}
          name={"email"}
          id={""}
          placeholder={"Email"}
        />
        <Input
          onChange={handleChange}
          value={data.password}
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
            <Input
              onChange={handleChange}
              type={"file"}
              name={"avatar"}
              id={""}
              placeholder={""}
            />
          </div>
        )}
        {!signUp && (
          <div
            onClick={() => navigate("/forgot")}
            className="text-red-400 my-2 text-sm cursor-pointer"
          >
            Şifremi unuttum
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
