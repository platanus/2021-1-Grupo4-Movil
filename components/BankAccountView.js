import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import styles from '../styles/showStyles';

export default function BankAccountView({ provider, setShowBankAccount }) {
  return (
    <View style={{ height: '100%', width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <View style={{ height: '60%', width: '90%', backgroundColor: 'white', borderColor: 'green', borderWidth: 2, marginBottom: '15%', borderRadius: 10, paddingHorizontal: '5%', paddingTop: 15 }}>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Nombre
          </Text>
          <Text style={styles.value}>
            {provider.attributes.contactName}
          </Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Rut
          </Text>
          <Text style={styles.value}>
            {provider.attributes.contactRut}
          </Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Banco
          </Text>
          <Text style={styles.value}>
            {provider.attributes.bankName}
          </Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Tipo de cuenta
          </Text>
          <Text style={styles.value}>
            {provider.attributes.accountType}
          </Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Número de cuenta
          </Text>
          <Text style={styles.value}>
            {provider.attributes.accountNumber}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.edit}
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
