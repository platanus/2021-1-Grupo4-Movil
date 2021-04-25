import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, TouchableOpacity, Alert} from 'react-native';
import {signUpUserAction} from "../store/actions/logInActions";
import {connect} from "react-redux"

const mapStateToProps = (state) => ({
    loggedIn: state.logged,
    signUpError: state.signUpError});

const mapDispatchToProps = (dispatch) => ({
    signUpUser: (data) => dispatch(signUpUserAction(data))});



function connectedSignUp(props) {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
      if (props.signUpError) {
        const message = props.loginError;
        if(message === "invalid_attributes") {
          setErrorMessage("Try again: This user does not exists");
        }
        else{
          setErrorMessage("Try again: Invalid email or password");
        }   
      } 
    }, [props.signUpError])

    function handleSignUp() {
     // verificar que contraseñas sean iguales
      props.signUpUser({user: user, password: password});
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
        <Text style={styles.loginText}> Confirm Password:</Text>
           <TextInput  
            onChangeText={(password) => setPassword2(password)}
            secureTextEntry={true}
            style={styles.input}
          />
          <Text style={{textAlign: "center", color:"#074eec"}}>
            {errorMessage}
          </Text>
           <TouchableOpacity
            onPress={handleSignUp} 
            style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{textAlign: "center", color:"#074eec"}}>
              Do you have an account? Log in!
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

const SignUp = connect(mapStateToProps, mapDispatchToProps,)(connectedSignUp);


export default SignUp;
