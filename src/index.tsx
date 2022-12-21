import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import UserDetail from './features/users/UserDetail';
import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import RequireAuth from './RequireAuth';
import { createRoot } from 'react-dom/client';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<App />} />
      <Route
        path="/user/:userName"
        element={
          <RequireAuth redirectTo="/login">
            <UserDetail />
          </RequireAuth>
        }
      />
    </>
  )
);

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.Fragment>
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.Fragment>
);
