import React from 'react';
import { StoreProvider } from 'easy-peasy';
import { Provider } from 'react-redux';
import store from './store/store';
import Main from './screens/Main';
import generateStore from './store/easyPeasyStoreTemplate';

export default function App() {
  return (
    // <StoreProvider store={generateStore(initialState)}>
    <Provider store={store}>
      <Main/>
    </Provider>
    // </StoreProvider>
  );
}

