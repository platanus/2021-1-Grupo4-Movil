import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import styles from '../styles/authStyles';

function SignUp() {
  const setLoginView = useStoreActions((actions) => actions.setLoginView);
  const setSignUpError = useStoreActions((actions) => actions.setSignUpError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const signUp = useStoreActions((actions) => actions.signUp);
  const signUpError = useStoreState((state) => state.signUpError);

  useEffect(() => {
    if (signUpError) {
      setErrorMessage('Inténtalo de nuevo: email o contraseña inválidos');
    }
  }, [signUpError]);

  function handleSignUp() {
    if (password === password2) {
      const body = {
        user: { email, password },
        logIn: false };
      signUp(body);
    } else {
      setErrorMessage('Las contraseñas no coinciden');
    }
  }

  function goToLogin() {
    setLoginView(true);
    setSignUpError(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>Hola KitchenGram!</Text>
      <View style={styles.logContainer}>
        <Text style={styles.loginText}> Email:</Text>
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
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToLogin}>
          <Text style={styles.haveAccountText}>
            ¿Ya tienes una cuenta? Inicia Sesión!
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

export default SignUp;
