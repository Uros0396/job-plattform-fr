import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

interface DataCompanyState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DataCompanyState = {
  data: [],
  loading: false,
  error: null,
};

export const getCompanyData = createAsyncThunk("data/getData", async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/companies`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }
  const data = await response.json();
  return data.companies || [];
});

const dataCompanySlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyData.pending, (state: DataCompanyState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCompanyData.fulfilled,
        (state: DataCompanyState, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getCompanyData.rejected, (state: DataCompanyState, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const getDataCompany = (state: RootState) =>
  state.dataCompanySlice.data || [];
export const isLoadingCompany = (state: RootState) =>
  state.dataCompanySlice.loading;
export const errorDataCompany = (state: RootState) =>
  state.dataCompanySlice.error;

export default dataCompanySlice.reducer;
