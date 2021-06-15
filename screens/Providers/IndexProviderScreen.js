import React, {
  useEffect,
  useState,
} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Icon from 'react-native-vector-icons/Ionicons';
import { camelizeKeys } from 'humps';
import styles from '../../styles/Providers/indexStyles';
import colors from '../../styles/appColors';

// eslint-disable-next-line max-statements
function IndexProviders({ navigation }) {
  const getProviders = useStoreActions((actions) => actions.getProviders);
  const chargeProviders = useStoreState((state) => state.chargeProviders);
  const setChargeProviders = useStoreActions((actions) => actions.setChargeProviders);

  const [mounted, setMounted] = useState(false);
  const [providers, setProviders] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Icon name='add'
          size={30}
          style={styles.navIcon}
          onPress={() => navigation.navigate('Nuevo Proveedor', {
            isNew: true,
            providers,
            setProviders,
          })}
        />
      ),
      headerTitle: 'Proveedores',
    });
  }, [navigation, providers]);

  useEffect(() => {
    getProviders()
      .then((res) => {
        setProviders(res);
        setMounted(true);
      })
      .catch(() => {
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chargeProviders) {
      getProviders()
        .then((res) => {
          setProviders(res);
          setMounted(true);
          setChargeProviders();
        })
        .catch(() => {
        });
    }
  }, [chargeProviders]);

  if (providers.length) {
    return (
      <View style={styles.container}>
        <ScrollView>
          {providers.map((provider, i) => (
            <TouchableOpacity
              // eslint-disable-next-line no-magic-numbers
              style={[styles.providerRow, (i % 2 === 0) ? styles.even : styles.odd]}
              key={provider.id}
              onPress={() => {
                navigation.navigate('Proveedor', {
                  provider: camelizeKeys(provider),
                  providers,
                  setProviders,
                });
              }}
            >
              <View style={styles.left}>
                <Text style={styles.name}>
                  {provider.attributes.name}
                </Text>
                <View style={styles.phone}>
                  <Icon name='call'
                    size={20}
                    color={colors.gray}
                  />
                  <Text style={styles.phoneText}>
                    {(provider.attributes.phone) && provider.attributes.phone}
                  </Text>
                </View>
              </View>
              <View style={styles.right}>
                <Icon name='chevron-down'
                  size={20}
                  color={colors.kitchengramGray600}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (mounted) && (
    <Text style={styles.emptyMessage}>
      Aún no tienes proveedores.
    </Text>
  );
}

export default IndexProviders;
