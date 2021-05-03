import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useStoreActions } from 'easy-peasy';
import styles from '../styles/authStyles';
import config from '../config';

function SignUp(props) {
  const { setLoginView } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const sendCredentials = useStoreActions((actions) => actions.sendCredentials);

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
    // {
    //   "user": {
    //     "email": "juan@uc.cl",
    //     "password": "juan1234"
    //   }
    // }
    const body = { user: { email, password } };
    const path = config.api.endpoints.users.createUser;
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
          onPress={() => handleSignUp()}
          style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setLoginView(true)}>
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
