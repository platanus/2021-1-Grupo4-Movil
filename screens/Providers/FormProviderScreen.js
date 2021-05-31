import React, {
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

function FormProvider({ navigation, route }) {
  const {
    provider = {
      attributes: {
        name: '',
        email: '',
        phone: '',
        country: 'Chile',
        webpage_url: '',
        delivery_days: 0,
        minimum_purchase: 0,
      },
    },
    providers,
    setProviders,
  } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+56');
  const [webPageUrl, setWebPage] = useState('');
  const [time, setTime] = useState(0);
  const [minPurchase, setMinPurchase] = useState(0);

  const createProvider = useStoreActions((actions) => actions.createProvider);

  function handleSubmitNew() {
    if (!name.length ||
      time <= 0 ||
      minPurchase < 0 ||
      !email.length) {
      return;
    }
    const body = {
      provider: {
        name,
        email,
        phone,
        country: provider.attributes.country,
        webpage_url: webPageUrl,
        delivery_days: time,
        minimum_purchase: minPurchase,
      },
    };
    createProvider(body)
      .then((res) => {
        const auxProviders = [...providers];
        auxProviders.push(res);
        setProviders(auxProviders);
        navigation.navigate('Proveedores');
      })
      .catch(() => {
      });
  }

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
          value={email}
          onChangeText={(text) => setEmail(text)}
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
          value={webPageUrl}
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
          onPress={() => handleSubmitNew()}
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
