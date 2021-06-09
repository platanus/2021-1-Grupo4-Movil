import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useStoreActions } from 'easy-peasy';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Ingredients/searchStyles';
import pickers from '../../styles/customPickerStyles';
import colors from '../../styles/appColors';

function SearchIngredient({ navigation, route }) {
  const {
    setName,
    setPrice,
    setQuantity,
  } = route.params;
  const searchCornerShop = useStoreActions((actions) => actions.searchCornerShop);

  const [query, setQuery] = useState('');
  const [searchResponse, setSearchResponse] = useState([]);
  const [actualProvider, setActualProvider] = useState(0);

  function handleSubmit() {
    if (query.length > 0) {
      setSearchResponse([]);
      searchCornerShop(query)
        .then((res) => {
          if (res.length > 0) {
            setActualProvider(0);
            setSearchResponse(res);
          }
        })
        .catch(() => {});
    }
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.searchText}> Ingresa tu búsqueda:</Text>
        <TextInput
          onChangeText={(text) => setQuery(text)}
          value={query}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.scrapperButton}>
          <Text style={styles.scrapperButtonText}>
          Buscar ingrediente
          </Text>
        </TouchableOpacity>
      </View>
      {(searchResponse.length > 0) &&
        (
          <View style={styles.responseContainer}>
            <View style={styles.customPickerBox}>
              <RNPickerSelect
                style={pickers.providerPicker}
                key={'0'}
                placeholder={{
                  label: 'Escoge tu proveedor...',
                  value: 0,
                }}
                value={actualProvider.name}
                onValueChange={(value) => {
                  setActualProvider(value);
                }}
                items={searchResponse.map((element, i) => ({
                  key: i,
                  label: element.provider.name,
                  value: i,
                }))}
              />
              <Icon name='chevron-down'
                size={25}
                color={colors.kitchengramWhite}
                style={styles.arrowIcon}
              />
            </View>
            {searchResponse[actualProvider].products.map((product, i) => (
              <TouchableOpacity
                // eslint-disable-next-line no-magic-numbers
                style={(i % 2 === 0) ?
                  [styles.productContainer, styles.even] : [styles.productContainer, styles.odd]}
                onPress={() => {
                  setName(product.name);
                  setPrice(product.price);
                  setQuantity(product.package);
                  navigation.navigate('Nuevo Ingrediente', {
                    isFromSearch: true,
                  });
                }}
                key={i}
              >
                <View style={styles.left}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: product.img_url,
                    }}
                  />
                  <Text style={styles.productName}>
                    {product.name}
                  </Text>
                </View>
                <View style={styles.right}>
                  <Text style={styles.price}>
                    {`$ ${product.price}`}
                  </Text>
                  <Text style={styles.measure}>
                    {product.package}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
    </ScrollView>
  );
}

export default SearchIngredient;
