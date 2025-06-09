import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dataReducer from "../reducer/getDataCompany";
import dataCompanyReducer from "../reducer/getDataCompany";
import updateCredentialsReducer from "../reducer/getDataCompany";
import userByIdReducer from "@/reducer/userByIdSlice";

const rootReducer = combineReducers({
  dataSlice: dataReducer,
  dataCompanySlice: dataCompanyReducer,
  credentialsSlice: updateCredentialsReducer,
  userById: userByIdReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
