import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuth: false,
  loading: false,
};
export const register = createAsyncThunk("register", async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const res = await fetch(`http://localhost:4000/register`, requestOptions);
  return await res.json();
});
export const login = createAsyncThunk("login", async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: data.email, password: data.password }),
  };
  const response = await fetch(`http://localhost:4000/login`, requestOptions);
  let res = await response.json();
  console.log("Login yanıtı:", res);
  localStorage.setItem("token", res?.token);
  return res;
});

export const profile = createAsyncThunk("profile", async (_, thunkAPI) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return thunkAPI.rejectWithValue("Token bulunamadı");
  }

  const response = await fetch(`http://localhost:4000/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const err = await response.json();
    return thunkAPI.rejectWithValue(err.message || "Profil alınamadı");
  }

  return await response.json();
});

export const forgotPassword = createAsyncThunk("forgot", async (email) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  };
  const response = await fetch(
    `http://localhost:4000/forgotPassword`,
    requestOptions
  );
  let res = await response.json();
  return res;
});

export const resetPassword = createAsyncThunk("reset", async (params) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: params.password }),
  };
  const response = await fetch(
    `http://localhost:4000/reset/${params.token}`,
    requestOptions
  );
  let res = await response.json();
  return res;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(profile.pending, (state, action) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(profile.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(profile.rejected, (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.user = {};
    });
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(resetPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
