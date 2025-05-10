import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  adminProducts: [],
  product: {},
  loading: false,
};
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (filters) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(
        `http://localhost:4000/products?${queryParams}`
      );
      const data = await response.json();
      return data.products; // Burada backend'den dönen 'products' veri döndürülüyor
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
);

// export const getProducts = createAsyncThunk("products", async (params) => {
//   const queryParams = new URLSearchParams();

//   // Parametreleri doğru şekilde query string'e ekleyin
//   if (params.keyword) queryParams.append("keyword", params.keyword);
//   if (params.category) queryParams.append("category", params.category);
//   if (params.rating) queryParams.append("rating[gte]", params.rating);
//   if (params["price[gte]"])
//     queryParams.append("price[gte]", params["price[gte]"]);
//   if (params["price[lte]"])
//     queryParams.append("price[lte]", params["price[lte]"]);

//   const url = `http://localhost:4000/products?${queryParams.toString()}`;
//   const res = await fetch(url);
//   const data = await res.json();

//   return data.products; // Sadece ürünleri dön
// });

export const getAdminProducts = createAsyncThunk("admin", async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:4000/admin/products`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return await res.json();
});

export const addAdminProducts = createAsyncThunk("adminadd", async (data) => {
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: "POST",
    headers: { authorization: `Bearer ${token}` },
    body: JSON.stringify({ data }),
  };
  const res = await fetch(
    `http://localhost:4000/admin/product/new`,
    requestOptions
  );
  return await res.json();
});

export const getProductDetail = createAsyncThunk("product", async (id) => {
  const res = await fetch(`http://localhost:4000/products/${id}`);
  return await res.json();
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getProductDetail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getAdminProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.adminProducts = action.payload;
    });
    builder.addCase(addAdminProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.adminProducts = [...state.products, action.payload];
    });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
