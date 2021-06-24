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
import formatPhone from '../../utils/formatPhone';
import KeyboardAvoidWrapper from '../../components/KeyboardAvoidWrapper';

// eslint-disable-next-line max-statements
function FormProvider({ navigation, route }) {
  const {
    isNew,
    provider = {
      attributes: {
        name: '',
        email: '',
        phone: '+56 ',
        country: 'Chile',
        webpageUrl: '',
        deliveryDays: 0,
        minimumPurchase: 0,
      },
    },
    providers,
    setProviders,
  } = route.params;

  const [name, setName] = useState(provider.attributes.name);
  const [email, setEmail] = useState(provider.attributes.email);
  const [phone, setPhone] = useState(provider.attributes.phone);
  const [webpageUrl, setWebpageUrl] = useState(provider.attributes.webpageUrl);
  const [time, setTime] = useState(provider.attributes.deliveryDays);
  const [minPurchase, setMinPurchase] = useState(provider.attributes.minimumPurchase);

  const createProvider = useStoreActions((actions) => actions.createProvider);
  const editProvider = useStoreActions((actions) => actions.editProvider);

  function checkValidInputs() {
    const validations = [
      { error: !name.length, message: 'Debes asignar un nombre al proveedor' },
      { error: !email.length, message: 'Debes ingresar un email válido.' },
      { error: time <= 0, message: 'Debes ingresar un tiempo válido' },
      { error: minPurchase <= 0, message: 'Debes ingresar un mínimo de compra válido' },
    ];
    const error = validations.find((validation) => (validation.error));
    if (error) {
      alert(error.message);

      return false;
    }

    return true;
  }

  function handleSubmit(create) {
    if (!checkValidInputs()) return;

    const attributes = {
      name,
      email,
      phone,
      country: provider.attributes.country,
      webpageUrl,
      deliveryDays: time,
      minimumPurchase: minPurchase,
    };
    provider.attributes = attributes;
    const body = {
      provider: provider.attributes,
    };
    if (create) {
      createProvider(body)
        .then((res) => {
          const auxProviders = [...providers];
          auxProviders.push(res);
          setProviders(auxProviders);
          navigation.navigate('Proveedores');
        })
        .catch(() => {
        });
    } else {
      editProvider({ body, id: provider.id })
        .then(() => {
          const auxProviders = providers.filter(item => item.id !== provider.id);
          auxProviders.push(provider);
          setProviders(auxProviders);
          navigation.navigate('Proveedor', {
            provider,
            providers,
            setProviders,
          });
        })
        .catch(() => {
        });
    }
  }

  return (
    <>
      <KeyboardAvoidWrapper>
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
              autoCapitalize="none"
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
              returnKeyType='done'
              value={phone}
              onChangeText={(text) => setPhone(formatPhone(text))}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
            Página Web
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Página Web..."
              autoCapitalize="none"
              value={webpageUrl}
              onChangeText={(text) => setWebpageUrl(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
            Tiempo de entrega (días)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Tiempo de entrega..."
              keyboardType="number-pad"
              returnKeyType='done'
              value={time ? time.toString() : 0}
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
              returnKeyType='done'
              value={minPurchase ? minPurchase.toString() : 0}
              onChangeText={(text) => setMinPurchase(text)}
            />
          </View>
        </View>
      </KeyboardAvoidWrapper>
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
          onPress={() => handleSubmit(isNew)}
        >
          <Text style={[styles.buttonText, styles.confirmText]}>
            {isNew ? 'Agregar proveedor' : 'Editar proveedor' }
          </Text>
        </TouchableOpacity>
      </View>

    </>
  );
}

export default FormProvider;
