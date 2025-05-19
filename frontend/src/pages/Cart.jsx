import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/slice/cartSlice";
import { AiOutlineDelete } from "react-icons/ai";

const Cart = () => {
  const { carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Sepet
      </h1>

      {carts?.length > 0 ? (
        <div className="space-y-6 max-w-4xl mx-auto">
          {carts.map((cart, key) => (
            <div
              key={key}
              className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={cart?.image?.url}
                  alt={cart?.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold">{cart?.name}</h2>
                  <p className="text-gray-600">{cart?.price} ₺</p>
                </div>
              </div>

              <button
                onClick={() => deleteItem(cart?.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition cursor-pointer"
              >
                <AiOutlineDelete size={20} />
                Sil
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-lg mt-20">
          Sepetinizde ürün bulunmamaktadır.
        </div>
      )}
    </div>
  );
};

export default Cart;
