/* eslint-disable max-statements */
import React, {
  useEffect,
  useState,
} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import {
  useStoreActions,
  useStoreState,
} from 'easy-peasy';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Providers/indexStyles';
import colors from '../../styles/appColors';
import SearchElements from '../../components/searchElementsAndFilter';

function IndexProviders({ navigation }) {
  const getProviders = useStoreActions((actions) => actions.getProviders);
  const hasToGetProviders = useStoreState((state) => state.hasToGetProviders);
  const setHasToGetProviders = useStoreActions((actions) => actions.setHasToGetProviders);
  const [mounted, setMounted] = useState(false);
  const [providers, setProviders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [providersToShow, setProvidersToShow] = useState([]);

  function onRefresh() {
    setRefreshing(true);
    getProviders()
      .then((res) => {
        setProviders(res);
      });
    setRefreshing(false);
  }

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
  }, [getProviders]);

  useEffect(() => {
    if (hasToGetProviders) {
      getProviders()
        .then((res) => {
          setHasToGetProviders();
          setProviders(res);
          setMounted(true);
        })
        .catch(() => {
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasToGetProviders]);

  if (providers.length) {
    return (
      <View style={styles.container}>
        <SearchElements
          elements={providers}
          setFilteredElements={setProvidersToShow}
          elementName='Proveedor'/>
        <FlatList
          keyExtractor={(item) => item.id}
          data={providersToShow}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
          renderItem={({ item }) => (

            <TouchableOpacity
              // eslint-disable-next-line no-magic-numbers
              style={[styles.providerRow, styles.odd]}
              onPress={() => {
                navigation.navigate('Proveedor', {
                  provider: item,
                  providers,
                  setProviders,
                });
              }}
            >
              <View style={styles.left}>
                <Text style={styles.name}>
                  {item.attributes.name}
                </Text>
                <View style={styles.phone}>
                  <Icon name='call'
                    size={20}
                    color={colors.gray}
                  />
                  <Text style={styles.phoneText}>
                    {(item.attributes.phone) && item.attributes.phone}
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
          )}
        />
      </View>
    );
  }

  return (mounted) && (
    <ScrollView style={styles.scroll} refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>
      <Text style={styles.emptyMessage}>
        Aún no tienes proveedores.
      </Text>
    </ScrollView>
  );
}

export default IndexProviders;
