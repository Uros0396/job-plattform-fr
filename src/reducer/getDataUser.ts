import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface DataState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

export const getData = createAsyncThunk("data/getData", async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_BASE_URL}/users`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await response.json();
  console.log(data);
  return data.users || [];
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state: DataState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getData.fulfilled,
        (state: DataState, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.data = action.payload.filter(
            (user: any) => user.role === "user"
          );
          console.log(action.payload);
        }
      )
      .addCase(getData.rejected, (state: DataState, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const getDataUser = (state: RootState) => state.dataSlice.data || [];
export const isLoading = (state: RootState) => state.dataSlice.loading;
export const errorData = (state: RootState) => state.dataSlice.error;

export default dataSlice.reducer;
