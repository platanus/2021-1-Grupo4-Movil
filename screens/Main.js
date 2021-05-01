import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import LogIn from './LogInScreen';
import SignUp from './SignUpScreen';

function mapStateToProps(state) {
  return ({
    loggedIn: state.logged,
    haveAccount: state.haveAccount });
}

function ConnectedMain(props) {
  return (
    <View style={{ flex: 1 }}>

      {props.loggedIn ?
        <View></View>
      // aqui irá el navegador de App principal (logeado)
        :
        props.haveAccount ?
          <LogIn/> :
          <SignUp/>}

    </View>
  );
}

const Main = connect(mapStateToProps, null)(ConnectedMain);

export default Main;
