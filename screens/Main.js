import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import {connect} from "react-redux";
import LogIn from './LogInScreen'
import SignUp from './SignUpScreen'

const mapStateToProps = (state) => ({
    loggedIn: state.logged,
    haveAccount: state.haveAccount});



function connectedMain(props) {
    return (
        <View style={{flex: 1}}>


       {props.loggedIn ? 
          <View></View>
          // aqui irá el navegador de App principal (logeado)
       :
       props.haveAccount ? 
        <LogIn/>
        :
        <SignUp/>}
        
        </View>
      )
      
    
}


const Main = connect(mapStateToProps, null,)(connectedMain);


export default Main
