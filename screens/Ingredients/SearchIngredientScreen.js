import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
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

  function handleSubmit() {
    if (query.length > 0) {
      searchCornerShop(query)
        .then((res) => {
          if (res.length > 0) {
            setSearchResponse(res);
          }
        })
        .catch(() => {});
    }
  }

  useEffect(() => {
    console.log('Actualizando Provider', actualProvider);
  }, [actualProvider]);

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
                placeholder={{
                  label: searchResponse[actualProvider].provider.name,
                  value: searchResponse[actualProvider].provider.name,
                }}
                value={searchResponse[actualProvider].provider.name}
                onValueChange={(value) => setActualProvider(value)}
                items={searchResponse.map((element, i) => ({
                  ...element.provider,
                  key: i,
                  label: element.provider.name,
                  value: element.provider.id - 1,
                }))}
              />
            </View>
            {searchResponse[actualProvider].products.map((product, i) => (
              <Text key={i}>{product.name}</Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default SearchIngredient;
