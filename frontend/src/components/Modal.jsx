import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { openModalFunc } from "../redux/slice/generalSlice";
import Button from "./Button";

const Modal = ({ title, content, onClick, btnName }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 right-0 left-0 bottom-0   ">
      <div className="w-[500px] bg-white border p-4 rounded-md">
        <div className="flex items-center justify-between">
          <div className="text-xl">{title}</div>
          <div onClick={() => dispatch(openModalFunc())}>
            <AiOutlineClose size={25} />
          </div>
        </div>
        {content}
        <Button text={btnName} onClick={onClick} />
      </div>
    </div>
  );
};

export default Modal;
