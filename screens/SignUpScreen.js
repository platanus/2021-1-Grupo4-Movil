import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import styles from '../styles/authStyles';

function SignUp(props) {
  const { setLoginView } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const sendCredentials = useStoreActions((actions) => actions.sendCredentials);
  const signUpError = useStoreState((state) => state.signUpError);

  useEffect(() => {
    if (signUpError) {
      setErrorMessage('Inténtalo de nuevo: email o contraseña inválido');
    }
  }, [signUpError]);

  function handleSignUp() {
    if (password === password2) {
      const body = {
        user: { email, password },
        logIn: false };
      sendCredentials(body);
    } else {
      setErrorMessage('Las contraseñas no coinciden');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>Hola KitchenGram!</Text>
      <View style={styles.logContainer}>
        <Text style={styles.loginText}>Email:</Text>
        <TextInput
          onChangeText={(mail) => setEmail(mail)}
          style={styles.input}
          autoCapitalize="none"/>
        <Text style={styles.loginText}> Contraseña:</Text>
        <TextInput
          onChangeText={(pass) => setPassword(pass)}
          secureTextEntry={true}
          style={styles.input}
        />
        <Text style={styles.loginText}> Confirmar Contraseña:</Text>
        <TextInput
          onChangeText={(pass2) => setPassword2(pass2)}
          secureTextEntry={true}
          style={styles.input}
        />
        <Text style={styles.errorMessage}>
          {errorMessage}
        </Text>
        <TouchableOpacity
          onPress={() => handleSignUp()}
          style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setLoginView(true)}>
          <Text style={{ textAlign: 'center', color: '#074eec', marginTop: '4%' }}>
            ¿Ya tienes una cuenta? Inicia Sesión!
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

// const SignUp = connect(mapStateToProps, mapDispatchToProps)(ConnectedSignUp);

export default SignUp;
