import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, TouchableOpacity, Alert} from 'react-native';
import {loginUserAction} from "../store/actions/logInActions";
import {connect} from "react-redux"

const mapStateToProps = (state) => ({
    loggedIn: state.logged,
    loginError: state.loginError});

const mapDispatchToProps = (dispatch) => ({
    loginUser: (data) => dispatch(loginUserAction(data))});



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

    if (props.loggedIn) {
      return(
      <View>
        <Text>hola estas loggeado</Text>
      </View>)
      
    } else {
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
          <Text style={{textAlign: "center", color:"#074eec"}}>
            {errorMessage}
          </Text>
           <TouchableOpacity
            onPress={handleLogin} 
            style={styles.button}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{textAlign: "center", color:"#074eec"}}>
              Don't have an account? Sign up!
            </Text>
          </TouchableOpacity>
          </View>
         
          <StatusBar style="auto" />
        </View>
        )
      
    }
    
}

const styles = StyleSheet.create({
    button: { 
    backgroundColor: "#074eec",
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', 
    marginTop: 10,},
  
    buttonText: { 
    color: 'white',
    fontWeight: 'bold',
    },
  
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      // justifyContent: 'center',
      paddingTop: "30%",
    },
    helloText:{
      marginTop: 0,
      fontSize: 24,
      color: "#074eec",
      fontWeight: "bold",
      marginBottom: "20%",
  
    },
    input:{
      height: 40,
      margin: 5,
      borderWidth: 2,
      borderColor: "#074eec",
      maxWidth: "100%",
      marginLeft: 3,
      borderRadius: 5,
      paddingHorizontal:10,
      
    },
    logContainer: {
      width: "70%",
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'flex-start',
    },
    loginText:{
      fontSize: 18,
      color: "#074eec",
    },
   
  });

const LogIn = connect(mapStateToProps, mapDispatchToProps,)(connectedLogIn);


export default LogIn
