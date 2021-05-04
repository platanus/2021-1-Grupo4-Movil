import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import {connect} from "react-redux";
import { NavigationContainer } from '@react-navigation/native';

import LogIn from './LogInScreen';
import SignUp from './SignUpScreen';
import HomeTabs from '../navigators/bottomNavigation';


const mapStateToProps = (state) => ({
    loggedIn: state.logged,
    haveAccount: state.haveAccount});



function connectedMain(props) {
    return (
        <View style={{flex: 1}}>


       {props.loggedIn ? 
        <NavigationContainer>
          <HomeTabs />
        </NavigationContainer>
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
