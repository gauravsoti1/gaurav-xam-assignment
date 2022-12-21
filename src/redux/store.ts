import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import authenticationReducer, {
  AuthenticationStateType,
} from '../features/authentication/authenticationSlice';

import thunk from 'redux-thunk';
import usersReducer from '../features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import { UserType } from '../data/usersData';

export const configAuthenticationPersistance = {
  key: 'root',
  storage: storageSession,
  blacklist: ['users'],
};

export const configRootPersistance = {
  key: 'root',
  storage: storage,
  blacklist: ['authentication'],
};

export interface IAppState {
  authentication: AuthenticationStateType;
  users: UserType[];
}

const rootReducer = combineReducers({
  authentication: persistReducer(
    configAuthenticationPersistance,
    authenticationReducer
  ),
  users: usersReducer,
});

export const buildStore = () =>
  configureStore({
    reducer: persistReducer(configRootPersistance, rootReducer),
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
  });

const store = buildStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
