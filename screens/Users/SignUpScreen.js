/* eslint-disable max-statements */
/* global require */
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/authStyles';
import colors from '../../styles/appColors';

function SignUp() {
  const setLoggedOutView = useStoreActions((actions) => actions.setLoggedOutView);
  const setSignUpError = useStoreActions((actions) => actions.setSignUpError);
  const [email, setEmail] = useState('');
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const signUp = useStoreActions((actions) => actions.signUp);
  const signUpError = useStoreState((state) => state.signUpError);
  const [hideFirstPassword, setHideFirstPassword] = useState(true);
  const [hideSecondPassword, setHideSecondPassword] = useState(true);

  useEffect(() => {
    if (signUpError) {
      if (signUpError === 'no es válido') {
        setErrorMessage('El email ingresado no es válido');
      } else if (signUpError === 'Este correo ya tiene cuenta') {
        setErrorMessage('El email ingresado ya está registrado');
      } else {
        setErrorMessage('Ocurrió un error con el registro');
      }
    }
  }, [signUpError]);

  function validForm() {
    const MIN_LENGTH = 6;
    if (firstPassword !== secondPassword) {
      setErrorMessage('Las contraseñas no coinciden');

      return false;
    } else if (firstPassword.length < MIN_LENGTH || secondPassword.length < MIN_LENGTH) {
      setErrorMessage('La contraseña debe tener al menos 6 carácteres');

      return false;
    }

    return true;
  }

  function handleSignUp() {
    setErrorMessage('');
    if (validForm()) {
      const body = {
        user: { email, password: firstPassword },
        logIn: false };
      signUp(body);
    }
  }

  function goToLogin() {
    setLoggedOutView('login');
    setSignUpError(false);
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/chef.png')} style={styles.chefIcon} />
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>¡Bienvenido/a a Kitchengram!</Text>
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
            onChangeText={(pass) => setFirstPassword(pass)}
            secureTextEntry={hideFirstPassword}
            style={styles.input}
          />
          <Icon name={hideFirstPassword ? 'eye-off-sharp' : 'eye-sharp'}
            color={colors.kitchengramGray600}
            size={20} style={styles.eye}
            onPress={() => setHideFirstPassword(!hideFirstPassword)}/>
        </View>
        <Text style={styles.loginText}>
          Confirmar Contraseña:
        </Text>
        <View>
          <TextInput
            onChangeText={(pass) => setSecondPassword(pass)}
            secureTextEntry={hideSecondPassword}
            style={styles.input}
          />
          <Icon name={hideSecondPassword ? 'eye-off-sharp' : 'eye-sharp'}
            color={colors.kitchengramGray600}
            size={20}
            style={styles.eye}
            onPress={() => setHideSecondPassword(!hideSecondPassword)}/>
        </View>
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
            ¿Ya tienes una cuenta? Inicia sesión!
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

export default SignUp;
