import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UpdateCredentialsState {
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}

const initialState: UpdateCredentialsState = {
  loading: false,
  successMessage: null,
  errorMessage: null,
};

const getEndpointUrl = (
  role: "user" | "company",
  action: "email" | "password",
  userId: string
) => {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (action === "email") {
    return role === "user"
      ? `${base}/users/updateEmail/${userId}`
      : `${base}/companies/updateEmail/${userId}`;
  } else {
    return role === "user"
      ? `${base}/users/updatePassword/${userId}`
      : `${base}/companies/updatePassword/${userId}`;
  }
};

export const updateEmail = createAsyncThunk<
  string,
  {
    userId: string;
    role: "user" | "company";
    newEmail: string;
    password: string;
  },
  { rejectValue: string }
>(
  "credentials/updateEmail",
  async ({ userId, role, newEmail, password }, thunkAPI) => {
    try {
      const response = await fetch(getEndpointUrl(role, "email", userId), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to update email"
        );
      }

      return data.message || "Email updated successfully";
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Network error");
    }
  }
);

export const updatePassword = createAsyncThunk<
  string,
  {
    userId: string;
    role: "user" | "company";
    oldPassword: string;
    newPassword: string;
  },
  { rejectValue: string }
>(
  "credentials/updatePassword",
  async ({ userId, role, oldPassword, newPassword }, thunkAPI) => {
    try {
      const response = await fetch(getEndpointUrl(role, "password", userId), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to update password"
        );
      }

      return data.message || "Password updated successfully";
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Network error");
    }
  }
);

const updateCredentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateEmail.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload || "Unknown error";
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload || "Unknown error";
      });
  },
});

export const { clearMessages } = updateCredentialsSlice.actions;
export default updateCredentialsSlice.reducer;
