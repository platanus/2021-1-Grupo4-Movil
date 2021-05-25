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

import styles from '../../styles/Ingredients/searchStyles';
import customPickerStyles from '../../styles/customPickerStyles';

function SearchIngredient({ navigation }) {
  const searchCornerShop = useStoreActions((actions) => actions.searchCornerShop);

  const [query, setQuery] = useState('');
  const [searchResponse, setSearchResponse] = useState([]);
  const [actualProvider, setActualProvider] = useState(0);
  const evenNumber = 2;

  function handleSubmit() {
    if (query.length > 0) {
      searchCornerShop(query)
        .then((res) => {
          if (res.length > 0) {
            setActualProvider(res[0].provider.id);
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
          Buscar Ingrediente
          </Text>
        </TouchableOpacity>
        {(searchResponse.length > 0) &&
        (
          <View style={styles.responseContainer}>
            <View style={styles.customPickerBox}>
              <RNPickerSelect
                style={customPickerStyles}
                key={'0'}
                placeholder={{}}
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
            </View>
            {searchResponse[actualProvider - 1].products.map((product, i) => (
              <View
                style={(i % evenNumber === 0) ?
                  [styles.productContainer, styles.even] : [styles.productContainer, styles.odd]}
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
                  <Text style={styles.package}>
                    {product.package}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default SearchIngredient;
