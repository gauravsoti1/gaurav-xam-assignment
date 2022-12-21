import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { buildStore } from '../redux/store';

export function renderWithProviders(ui: React.ReactElement) {
  const store = buildStore();
  function Wrapper({ children }: PropsWithChildren<any>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper }) };
}
