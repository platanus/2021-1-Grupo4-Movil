import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Clipboard from 'expo-clipboard';

import styles from '../styles/showStyles';

export default function BankAccountView({ provider, setShowBankAccount }) {
  const bankAccount = { ...provider.attributes };
  function copyToClipboard() {
    Clipboard.setString(`${bankAccount.contactName}\n${
      bankAccount.contactRut}\n${
      bankAccount.bankName}\n${
      bankAccount.accountType}\n${
      bankAccount.accountNumber}`);
    Alert.alert('¡Los datos han sido copiados con éxito!', '',
      [{ text: 'Ok', style: 'default' }],
    );
  }

  return (
    <View style={styles.backgroundOpacity}>
      <View style={styles.bankAccountPopUp}>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Nombre
          </Text>
          <Text style={styles.value}>
            {bankAccount.contactName}
          </Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Rut
          </Text>
          <Text style={styles.value}>
            {bankAccount.contactRut}
          </Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Banco
          </Text>
          <Text style={styles.value}>
            {bankAccount.bankName}
          </Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Tipo de cuenta
          </Text>
          <Text style={styles.value}>
            {bankAccount.accountType}
          </Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Número de cuenta
          </Text>
          <Text style={styles.value}>
            {bankAccount.accountNumber}
          </Text>
        </View>
        <View style={styles.bankButtonsContainer}>
          <TouchableOpacity
            style={styles.edit}
            onPress={copyToClipboard}
          >
            <Text style={styles.editText}>
              Copiar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delete}
            onPress={() => setShowBankAccount(false)}
          >
            <Text style={styles.deleteText}>
              Cerrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
