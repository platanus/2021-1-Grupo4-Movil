import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import styles from '../styles/authStyles';

function LogIn(props) {
  const { setLoginView } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const login = useStoreActions((actions) => actions.login);
  const loginError = useStoreState((state) => state.loginError);

  useEffect(() => {
    if (loginError) {
      setErrorMessage('Inténtalo de nuevo: email o contraseña inválidos');
    }
  }, [loginError]);

  function handleLogin() {
    const body = {
      user: { email, password },
      logIn: true };
    login(body);
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

        <Text style={styles.errorMessage}>
          {errorMessage}
        </Text>

        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setLoginView(false)}>
          <Text style={styles.haveAccountText}>
            ¿No tienes una cuenta? Regístrate!
          </Text>
        </TouchableOpacity>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

export default LogIn;
