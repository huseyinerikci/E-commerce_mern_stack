import { createSlice } from "@reduxjs/toolkit";

// Kullanıcı ID'sini JWT token'dan almak için fonksiyon
const getUserId = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id || payload._id; // ID'nin token içindeki adı farklıysa ayarla
  } catch {
    return null;
  }
};

const fetchFromLocalStorage = () => {
  const userId = getUserId(); // Kullanıcı ID'sini al
  if (!userId) return []; // Eğer kullanıcı yoksa, boş sepet döndür
  const data = localStorage.getItem(`cart-${userId}`); // Kullanıcıya özel cart verisini getir
  return data ? JSON.parse(data) : [];
};

const storeInLocalStorage = (userId, data) => {
  if (userId) {
    localStorage.setItem(`cart-${userId}`, JSON.stringify(data)); // Sepeti kullanıcının ID'sine göre sakla
  }
};

const initialState = {
  carts: fetchFromLocalStorage(), // Başlangıçta sepeti localStorage'tan yükle
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const userId = getUserId();
      const existing = state.carts.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        state.carts = state.carts.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        state.carts.push(action.payload);
      }
      storeInLocalStorage(userId, state.carts);
    },

    removeFromCart: (state, action) => {
      const userId = getUserId();
      state.carts = state.carts.filter((item) => item.id !== action.payload);
      storeInLocalStorage(userId, state.carts);
    },

    clearCart: (state) => {
      const userId = getUserId();
      state.carts = [];
      storeInLocalStorage(userId, state.carts);
    },

    hydrateCart: (state) => {
      const data = fetchFromLocalStorage();
      state.carts = data;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, hydrateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
