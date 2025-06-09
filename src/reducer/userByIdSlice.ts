import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

// 1. Tipi
interface UserByIdState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

// 2. Stato iniziale
const initialState: UserByIdState = {
  user: null,
  loading: false,
  error: null,
};

// 3. AsyncThunk per prendere un utente per ID
export const getUserById = createAsyncThunk(
  "userById/getUserById",
  async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/id/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user by ID");
    }
    const data = await response.json();

    // Aggiungi le URL direttamente ai dati dell'utente
    const userWithUrls = {
      ...data.user,
      imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/users/${data.user._id}/image`,
      cvUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/users/${data.user._id}/cv`,
    };

    return userWithUrls;
  }
);

// 4. Slice
const userByIdSlice = createSlice({
  name: "userById",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// 5. Selectors
export const selectUserById = (state: RootState) => state.userById.user;
export const isUserLoading = (state: RootState) => state.userById.loading;
export const userError = (state: RootState) => state.userById.error;

// 6. Export reducer e actions
export const { clearUser } = userByIdSlice.actions;
export default userByIdSlice.reducer;
