const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-10 mt-5 flex items-center justify-center text-lg bg-black hover:bg-black/80 text-white rounded-md cursor-pointer"
    >
      {text}
    </button>
  );
};

export default Button;
