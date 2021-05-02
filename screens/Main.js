import React from 'react';
import { View } from 'react-native';
import LogIn from './LogInScreen';
import SignUp from './SignUpScreen';

function Main(props) {
  return (
    <View style={{ flex: 1 }}>

      {props.loggedIn ?
        <View></View>
      // aqui irá el navegador de App principal (logeado)
        :
        props.haveAccount ?
          <SignUp/> :
          <LogIn/>}

    </View>
  );
}

export default Main;
