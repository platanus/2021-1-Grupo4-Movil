/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/authStyles';
import colors from '../styles/appColors';

function SignUp() {
  const setLoginView = useStoreActions((actions) => actions.setLoginView);
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
      setErrorMessage('Inténtalo de nuevo: email o contraseña inválidos');
    }
  }, [signUpError]);

  function handleSignUp() {
    if (firstPassword === secondPassword) {
      const body = {
        user: { email, password: firstPassword },
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
        <Text style={styles.loginText}>
          Email:
        </Text>
        <TextInput
          onChangeText={(mail) => setEmail(mail)}
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
            ¿Ya tienes una cuenta? Inicia Sesión!
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

export default SignUp;
