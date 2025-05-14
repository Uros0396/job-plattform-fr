import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dataReducer from "../reducer/getDataCompany";
import dataCompanyReducer from "../reducer/getDataCompany";
import updateCredentialsReducer from "../reducer/getDataCompany";

const rootReducer = combineReducers({
  dataSlice: dataReducer,
  dataCompanySlice: dataCompanyReducer,
  credentialsSlice: updateCredentialsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
