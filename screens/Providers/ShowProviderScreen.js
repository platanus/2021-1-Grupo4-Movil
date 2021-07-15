import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import { useStoreActions } from 'easy-peasy';
import BankAccountView from '../../components/BankAccountView';

import styles from '../../styles/showStyles';
import formatMoney from '../../utils/formatMoney';
import DeleteModal from '../../components/DeleteModal';

function ShowProvider({ navigation, route }) {
  const {
    provider,
    providers,
    setProviders,
  } = route.params;

  const deleteProvider = useStoreActions((actions) => actions.deleteProvider);
  const [showBankAccount, setShowBankAccount] = useState(false);

  const [showModal, setShowModal] = useState(false);

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
    <>
      <View style={styles.container}>
        <DeleteModal
          show={showModal}
          setShow={setShowModal}
          dependencies={[]}
          handleDelete={handleSubmitDelete}
          title={'Eliminar proveedor'}
          description={''}
          sureMessage={'¿Estás seguro que deseas eliminar este proveedor?'}/>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Nombre
          </Text>
          <Text style={styles.value}>
            {provider.attributes.name}
          </Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Teléfono
          </Text>
          <Text style={styles.value}>
            {provider.attributes.phone}
          </Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Correo
          </Text>
          <Text style={styles.value}>
            {provider.attributes.email}
          </Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Página web
          </Text>
          <Text
            style={styles.linkValue}
            onPress={(provider.attributes.webpageUrl) ?
              () => Linking.openURL(`https://${provider.attributes.webpageUrl}`) :
              null}
          >
            {provider.attributes.webpageUrl}
          </Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Mínimo de compra
          </Text>
          <Text style={styles.value}>
            {formatMoney(provider.attributes.minimumPurchase, '$ ', '')}
          </Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.name}>
            Tiempo de despacho
          </Text>
          <Text style={styles.value}>
            {(provider.attributes.deliveryDays) ?
              `${provider.attributes.deliveryDays} día(s) hábil(es)` :
              ''}
          </Text>
        </View>
        <TouchableOpacity style={styles.bankButton}
          onPress={() => setShowBankAccount(true)}>
          <Text style={styles.bankButtonText}>
            Datos bancarios
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.edit}
            onPress={() => {
              navigation.navigate('Editar Proveedor', {
                isNew: false,
                provider,
                providers,
                setProviders,
              });
            }}
          >
            <Text style={styles.editText}>
            Editar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delete}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.deleteText}>
            Borrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showBankAccount &&
     <BankAccountView provider={provider} setShowBankAccount={setShowBankAccount}/>
      }
    </>
  );
}

export default ShowProvider;
