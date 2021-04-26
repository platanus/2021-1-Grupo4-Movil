import React from 'react';
import {Provider} from 'react-redux'
import store from './store/store'
import Main from './screens/Main'


export default function App() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>  
  );
}

