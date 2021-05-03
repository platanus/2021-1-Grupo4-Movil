import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import config from '../config';
import styles from '../styles/authStyles';

function LogIn(props) {
  const { setLoginView } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const sendCredentials = useStoreActions((actions) => actions.sendCredentials);

  useEffect(() => {
    if (props.loginError) {
      const message = props.loginError;
      if (message === 'record_not_found') {
        setErrorMessage('Try again: This user does not exists');
      } else {
        setErrorMessage('Try again: Invalid email or password');
      }
    }
  }, [props.loginError]);

  function handleLogin() {
    const body = { user: { email, password } };
    const path = config.api.endpoints.users.logIn;
    sendCredentials({ _body: body, path, token: null });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>Hello KitchenGram!</Text>
      <View style={styles.logContainer}>

        <Text style={styles.loginText}> Mail:</Text>
        <TextInput
          onChangeText={(mail) => setEmail(mail)}
          style={styles.input}
          autoCapitalize="none"/>

        <Text style={styles.loginText}> Password:</Text>
        <TextInput
          onChangeText={(pass) => setPassword(pass)}
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
          onPress={() => setLoginView(false)}>
          <Text style={{ textAlign: 'center', color: '#074eec', marginTop: '4%' }}>
            Don&apos;t have an account? Sign up!
          </Text>
        </TouchableOpacity>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

// const LogIn = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogIn);

export default LogIn;
