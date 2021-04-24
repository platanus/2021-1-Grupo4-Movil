import React from 'react';
import LogIn from './screens/LogInScreen'
import {Provider} from 'react-redux'
import store from './store/store'


export default function App() {
  return (
    <Provider store={store}>
      <LogIn/>   
    </Provider>  
  );
}

