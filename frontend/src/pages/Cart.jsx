import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/slice/cartSlice";

const Cart = () => {
  const { carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteItem = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="min-h-screen">
      <h1 className="py-5 px-10 text-4xl">Sepet</h1>
      {carts?.length > 0 ? (
        <div>
          {carts?.map((cart, key) => (
            <div
              key={key}
              className="flex items-center justify-between border-b px-8 py-2 my-5"
            >
              <img src={cart?.image?.url} alt="image" className="w-40" />
              <div>{cart?.name}</div>
              <div>{cart?.price}</div>
              <div
                onClick={() => deleteItem(cart?.id)}
                className="w-[120px]  flex items-center justify-center h-12 rounded-md bg-red-500 "
              >
                Sil
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Sepetinizde ürün bulunmamaktadır</div>
      )}
    </div>
  );
};

export default Cart;
