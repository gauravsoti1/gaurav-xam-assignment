import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { users, UserType } from '../../data/usersData';
import type { RootState } from '../../redux/store';

const initialState: UserType[] = users;

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      state.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const index = state.findIndex(
        ({ userName }) => userName === action.payload
      );
      state.splice(index, 1);
    },
  },
});

export const { addUser, removeUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
