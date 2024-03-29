import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useStoreActions } from 'easy-peasy';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/Profile/profileStyles';
import colors from '../styles/appColors';
import KeyboardAvoidWrapper from '../components/KeyboardAvoidWrapper';

function Profile() {
  const logout = useStoreActions((actions) => actions.setLogOut);
  const changePassword = useStoreActions((actions) => actions.changePassword);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [hideNewPasswords, setHideNewPasswords] = useState(true);

  function handleChangePassword() {
    const PASSWORD_LENGTH = 6;
    if (password.length < PASSWORD_LENGTH || passwordConfirmation.length < PASSWORD_LENGTH) {
      Alert.alert('La contraseña debe tener al menos 6 carácteres');

      return;
    }
    if (password !== passwordConfirmation) {
      Alert.alert('Contraseñas no coinciden');

      return;
    }

    const body = {
      user: {
        password,
        passwordConfirmation,
      },
    };

    changePassword(body)
      .then(() => {
        Alert.alert('¡La clave se cambió con éxito!', '',
          [{ text: 'Ok', style: 'default' }],
        );
        setPassword('');
        setPasswordConfirmation('');
      })
      .catch(() => {
        Alert.alert('Hubo un error al cambiar la contraseña', '¿Ingresaste bien la contraseña?');
      });
  }

  return (
    <KeyboardAvoidWrapper>
      <View style={styles.container}>
        <Icon name={'ios-person-circle'}
          color={colors.kitchengramGray800}
          size={60}
        />
        <Text style={styles.profileTitle}>
          Perfil de usuario
        </Text>
        <View style={styles.changePasswordContainer}>
          <Text style={styles.sectionTitle}>
            Modifica tus datos
          </Text>
          <Text style={styles.loginText}>
            Nueva contraseña:
          </Text>
          <View>
            <TextInput
              value={password}
              onChangeText={(pass) => setPassword(pass)}
              secureTextEntry={hideNewPasswords}
              style={styles.input}
            />
            <Icon name={hideNewPasswords ? 'eye-off-sharp' : 'eye-sharp'}
              color={colors.kitchengramGray600}
              size={20} style={styles.eye}
              onPress={() => setHideNewPasswords(!hideNewPasswords)}/>
          </View>
          <Text style={styles.loginText}>
            Confirmar contraseña:
          </Text>
          <View>
            <TextInput
              value={passwordConfirmation}
              onChangeText={(pass) => setPasswordConfirmation(pass)}
              secureTextEntry={hideNewPasswords}
              style={styles.input}
            />
            <Icon name={hideNewPasswords ? 'eye-off-sharp' : 'eye-sharp'}
              color={colors.kitchengramGray600}
              size={20}
              style={styles.eye}
              onPress={() => setHideNewPasswords(!hideNewPasswords)}/>
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.saveButtonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleChangePassword}>
                <Text style={styles.buttonsText}>Guardar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.sessionButton}
              onPress={() => logout()}>
              <Text style={styles.buttonsText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidWrapper>
  );
}

export default Profile;
