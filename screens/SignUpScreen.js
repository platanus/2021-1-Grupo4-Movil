import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/authStyles';

function SignUp(props) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (props.signUpError) {
      const message = props.signUpError;
      if (message === 'invalid_attributes') {
        setErrorMessage('Try again: This user does not exists');
      } else {
        setErrorMessage('Try again: Invalid email or password');
      }
    }
  }, [props.signUpError]);

  function handleSignUp() {
    // verificar que contraseñas sean iguales
    props.signUpUser({ user, password });
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
          onChangeText={(pass) => setPassword(pass)}
          secureTextEntry={true}
          style={styles.input}
        />
        <Text style={styles.loginText}> Confirm Password:</Text>
        <TextInput
          onChangeText={(pass2) => setPassword2(pass2)}
          secureTextEntry={true}
          style={styles.input}
        />
        <Text style={styles.errorMessage}>
          {errorMessage}
        </Text>
        <TouchableOpacity
          disabled={password !== password2}
          onPress={handleSignUp}
          style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.changeToLogIn}>
          <Text style={{ textAlign: 'center', color: '#074eec', marginTop: '4%' }}>
            Already have an account? Log in!
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

// const SignUp = connect(mapStateToProps, mapDispatchToProps)(ConnectedSignUp);

export default SignUp;
