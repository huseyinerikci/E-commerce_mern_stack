import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  adminProducts: [],
  product: {},
  loading: false,
};
export const getProducts = createAsyncThunk(
  "products",
  async (params, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams();

      if (params?.keyword) queryParams.append("keyword", params.keyword);
      if (params?.category) queryParams.append("category", params.category);
      if (params?.rating) queryParams.append("rating[gte]", params.rating);
      if (params?.["price[gte]"])
        queryParams.append("price[gte]", params["price[gte]"]);
      if (params?.["price[lte]"])
        queryParams.append("price[lte]", params["price[lte]"]);

      const url = `http://localhost:4000/products?${queryParams.toString()}`;
      const res = await fetch(url);

      if (!res.ok) throw new Error("Ürünler alınamadı");

      const data = await res.json();
      return data.products;
    } catch (error) {
      console.error("getProducts error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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

    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(`http://localhost:4000/products/new`, requestOptions);
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
