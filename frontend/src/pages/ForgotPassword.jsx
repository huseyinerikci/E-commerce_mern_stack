import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/slice/userSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const forgotFunc = () => {
    let res = dispatch(forgotPassword(email));
    console.log(res);
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-1/3 space-y-3 border p-10 -mt-25">
        <div className="text-3xl">Şifremi Unuttum</div>
        <Input
          placeholder={"Email adresinizi giriniz"}
          onChange={(e) => setEmail(e.target.value)}
          name={"email"}
          id={""}
          type={"text"}
        />
        <Button text={"Onayla"} onClick={forgotFunc} />
      </div>
    </div>
  );
};

export default ForgotPassword;
