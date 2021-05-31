import React, {
  useEffect,
  useState,
} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import { useStoreActions } from 'easy-peasy';
import styles from '../../styles/Providers/formStyles';

function FormProvider({ navigation }) {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('+569');
  const [webPage, setWebPage] = useState('');
  const [time, setTime] = useState(0);
  const [minPurchase, setMinPurchase] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
            Nombre
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de proveedor..."
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
            Correo
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico..."
          value={mail}
          onChangeText={(text) => setMail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
            Teléfono
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Teléfono de contacto..."
          keyboardType="number-pad"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
            Página Web
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Página Web..."
          value={webPage}
          onChangeText={(text) => setWebPage(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
            Tiempo de entrega
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Tiempo de entrega..."
          keyboardType="number-pad"
          value={time.toString()}
          onChangeText={(text) => setTime(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
            Mínimo de compra
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo de compra..."
          keyboardType="number-pad"
          value={minPurchase.toString()}
          onChangeText={(text) => setMinPurchase(text)}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancel]}
          onPress={
            () => navigation.navigate('Proveedores')}
        >
          <Text style={[styles.buttonText, styles.cancelText]}>
              Cancelar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.confirm]}
          // onPress={(isNew) ? handleSubmitNew : handleSubmitEdit}
        >
          <Text style={[styles.buttonText, styles.confirmText]}>
                Agregar proveedor
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FormProvider;
