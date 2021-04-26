import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View , TextInput, TouchableOpacity} from 'react-native';
import {loginUserAction, changeAuthAction} from "../store/actions/logInActions";
import {connect} from "react-redux"
import styles from "../styles/authStyles"

const mapStateToProps = (state) => ({
    loggedIn: state.logged,
    loginError: state.loginError});

const mapDispatchToProps = (dispatch) => ({
    loginUser: (data) => dispatch(loginUserAction(data)),
    changeToSignUp: () => dispatch(changeAuthAction())
    });



function connectedLogIn(props) {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
      if (props.loginError) {
        const message = props.loginError;
        if(message === "record_not_found") {
          setErrorMessage("Try again: This user does not exists");
        }
        else{
          setErrorMessage("Try again: Invalid email or password");
        }   
      } 
    }, [props.loginError])

    function handleLogin() {
      props.loginUser({user: user, password: password});
    }

    return (
      <View style={styles.container}>
        <Text style={styles.helloText}>Hello KitchenGram!</Text>
        <View style={styles.logContainer}>

        <Text style={styles.loginText}> Mail:</Text>
        <TextInput
        onChangeText={(mail) => setUser(mail)}
        style={styles.input}
        autoCapitalize="none"/>

        <Text style={styles.loginText}> Password:</Text>
          <TextInput  
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          style={styles.input}
        />

        <Text style={styles.errorMessage}>
          {errorMessage}
        </Text>

          <TouchableOpacity
          onPress={handleLogin} 
          style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() =>props.changeToSignUp()}>
          <Text style={{textAlign: "center", color:"#074eec", marginTop:"4%"}}>
            Don't have an account? Sign up!
          </Text>
        </TouchableOpacity>

        </View>
        
        <StatusBar style="auto" />
      </View>
      )
      
    
}


const LogIn = connect(mapStateToProps, mapDispatchToProps,)(connectedLogIn);


export default LogIn
