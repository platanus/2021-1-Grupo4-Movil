/* eslint-disable max-statements */
/* global require */
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/authStyles';
import colors from '../../styles/appColors';

function LogIn() {
  const setLoggedOutView = useStoreActions((actions) => actions.setLoggedOutView);
  const setLoginError = useStoreActions((actions) => actions.setLoginError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const login = useStoreActions((actions) => actions.login);
  const loginError = useStoreState((state) => state.loginError);
  const [hidePassword, setHidePassword] = useState(true);

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

  function goToSignUp() {
    setLoggedOutView('sign_up');
    setLoginError(false);
  }

  function goToRecoverPassword() {
    setLoggedOutView('forgot_password');
    setLoginError(false);
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/chef.png')} style={styles.chefIcon} />
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>KitchenGram</Text>
        <Text style={styles.descriptionText}>La nueva forma de gestionar tu cocina y negocio</Text>
      </View>
      <View style={styles.logContainer}>
        <Text style={styles.loginText}>
          Email:
        </Text>
        <TextInput
          onChangeText={(mail) => setEmail(mail.trim())}
          style={styles.input}
          autoCapitalize="none"/>

        <Text style={styles.loginText}>
          Contraseña:
        </Text>
        <View>
          <TextInput
            onChangeText={(pass) => setPassword(pass)}
            secureTextEntry={hidePassword}
            style={styles.input}
          />
          <Icon name={hidePassword ? 'eye-off-sharp' : 'eye-sharp'}
            color={colors.kitchengramGray600}
            size={20}
            style={styles.eye}
            onPress={() => setHidePassword(!hidePassword)}/>
        </View>

        <Text style={styles.errorMessage}>
          {errorMessage}
        </Text>

        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goToSignUp}>
          <Text style={styles.haveAccountText}>
            ¿No tienes una cuenta? Regístrate!
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goToRecoverPassword}>
          <Text style={styles.forgotPasswordText}>
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

export default LogIn;
