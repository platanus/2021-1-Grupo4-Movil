import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { StoreProvider } from 'easy-peasy';
import Main from './screens/Main';
import generateStore from './store/store';

// To avoid warning
// LogBox.ignoreLogs([
//   'Non-serializable values were found in the navigation state',
// ]);

export default function App() {
  return (
    <StoreProvider store={generateStore}>
      <Main/>
    </StoreProvider>
  );
}

