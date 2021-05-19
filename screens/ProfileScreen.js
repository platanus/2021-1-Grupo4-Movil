import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStoreActions } from 'easy-peasy';
import styles from '../styles/authStyles';

function Profile() {
  const logout = useStoreActions((actions) => actions.setLogOut);

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <View style={styles.logContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => logout()}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Profile;
