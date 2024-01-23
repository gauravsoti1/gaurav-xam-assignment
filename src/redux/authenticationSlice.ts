import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../data/usersData";
import type { RootState } from "./store";

type UserStateType = Omit<UserType, "password">;

export interface AuthenticationStateType {
  isAuthenticated: boolean;
  user?: UserStateType;
}

const initialState: AuthenticationStateType = {
  isAuthenticated: false,
  user: undefined,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserStateType>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: () => initialState,
  },
});

export const { login, logout } = authenticationSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.authentication.isAuthenticated;
export const selectLoggedInUser = (state: RootState) =>
  state.authentication.user;

export const selectLoggedInUsername = (state: RootState) =>
  state.authentication.user?.userName;

export default authenticationSlice.reducer;
