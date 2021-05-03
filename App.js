import React from 'react';
import { StoreProvider } from 'easy-peasy';
import Main from './screens/Main';
import generateStore from './store/store';

export default function App() {
  return (
    <StoreProvider store={generateStore}>
      <Main/>
    </StoreProvider>
  );
}

