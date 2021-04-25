import React from 'react';
import LogIn from './screens/LogInScreen'
import SignUp from './screens/SignUpScreen'
import {Provider} from 'react-redux'
import store from './store/store'


export default function App() {
  return (
    <Provider store={store}>
      <SignUp/>
    </Provider>  
  );
}

