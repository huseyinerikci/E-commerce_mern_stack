const Input = ({ placeholder, value, name, id, type, onChange }) => {
  return (
    <input
      className="w-full border h-10 p-2 my-2 outline-none rounded-md"
      placeholder={placeholder}
      value={value}
      name={name}
      id={id}
      type={type}
      onChange={onChange}
    />
  );
};

export default Input;
