import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useStoreActions } from 'easy-peasy';

import styles from '../../styles/Providers/showStyles';

import formatMoney from '../../helpers/formatMoney';

function ShowProvider({ navigation, route }) {
  const {
    provider,
    providers,
    setProviders,
  } = route.params;

  const deleteProvider = useStoreActions((actions) => actions.deleteProvider);

  function handleSubmitDelete() {
    const body = { id: provider.id };
    deleteProvider(body)
      .then(() => {
        const auxProviders = providers.filter(item => item.id !== provider.id);
        setProviders(auxProviders);
        navigation.navigate('Proveedores', { providerDeleted: provider });
      })
      .catch(() => {
      });
  }

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalAttributeContainer}>
        <Text style={styles.modalName}>
          Nombre
        </Text>
        <Text style={styles.modalValue}>
          {provider.attributes.name}
        </Text>
      </View>
      <View style={styles.modalAttributeContainer}>
        <Text style={styles.modalName}>
          Teléfono
        </Text>
        <Text style={styles.modalValue}>
          {provider.attributes.phone}
        </Text>
      </View>
      <View style={styles.modalAttributeContainer}>
        <Text style={styles.modalName}>
          Correo
        </Text>
        <Text style={styles.modalValue}>
          {provider.attributes.email}
        </Text>
      </View>
      <View style={styles.modalAttributeContainer}>
        <Text style={styles.modalName}>
          Página web
        </Text>
        <Text style={styles.modalValue}>
          {provider.attributes.webpage_url}
        </Text>
      </View>
      <View style={styles.modalAttributeContainer}>
        <Text style={styles.modalName}>
          Mínimo de compra
        </Text>
        <Text style={styles.modalValue}>
          {formatMoney(provider.attributes.minimum_purchase, '$ ', '')}
        </Text>
      </View>
      <View style={styles.modalAttributeContainer}>
        <Text style={styles.modalName}>
          Tiempo de despacho
        </Text>
        <Text style={styles.modalValue}>
          {`${provider.attributes.delivery_days} días hábiles`}
        </Text>
      </View>
      <View style={styles.modalButtonsContainer}>
        <TouchableOpacity
          style={styles.modalDelete}
          onPress={handleSubmitDelete}
        >
          <Text style={styles.modalDeleteText}>
            Borrar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalEdit}
          onPress={() => navigation.navigate('Editar Proveedor', {
            isNew: false,
            provider,
            providers,
            setProviders,
          })}
        >
          <Text style={styles.modalEditText}>
            Editar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ShowProvider;
