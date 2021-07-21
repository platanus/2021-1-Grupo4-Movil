/* eslint-disable max-statements */
/* global require */
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import styles from '../../styles/authStyles';

function SignUp() {
  const setLoggedOutView = useStoreActions((actions) => actions.setLoggedOutView);
  const setForgotPasswordError = useStoreActions((actions) => actions.setForgotPasswordError);
  const forgotPasswordError = useStoreState((state) => state.forgotPasswordError);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const forgotPassword = useStoreActions((actions) => actions.forgotPassword);

  useEffect(() => {
    if (forgotPasswordError) {
      if (forgotPasswordError === 'record_not_found') {
        setErrorMessage('El correo ingresado no está registrado');
      } else {
        setErrorMessage('Ocurrió un error recuperando la contraseña');
      }
    }
  }, [forgotPasswordError]);

  function handleForgotPassword() {
    setErrorMessage('');
    const body = {
      user: { email },
    };
    forgotPassword(body);
  }

  function goToLogin() {
    setLoggedOutView('login');
    setForgotPasswordError(false);
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
          onChangeText={(mail) => setEmail(mail)}
          style={styles.input}
          autoCapitalize="none"/>
        <Text style={styles.errorMessage}>
          {errorMessage}
        </Text>
        <Text style={styles.infoMessage}>
          Te enviaremos un correo con las indicaciones para cambiar tu contraseña.
        </Text>
        <TouchableOpacity
          onPress={() => handleForgotPassword()}
          style={styles.button}>
          <Text style={styles.buttonText}>Recuperar contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToLogin}>
          <Text style={styles.haveAccountText}>
            Vuelve a iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

export default SignUp;
