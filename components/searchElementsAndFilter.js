import React, {
  useEffect,
  useState,
} from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/searchStyles';
import colors from '../styles/appColors';
import removeSpecialCharacters from '../utils/removeSpecialCharacters';

function SearchElements({ elements, setFilteredElements, elementName }) {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText) {
      setFilteredElements(elements.filter((element) =>
        removeSpecialCharacters(element.attributes.name).includes(removeSpecialCharacters(searchText))));
    } else {
      setFilteredElements(elements);
    }
  }, [elements, setFilteredElements, searchText]);

  return (
    <View style={styles.searchRow}>
      <View style={styles.searchIcon}>
        <Icon
          name='search-outline'
          size={25}
          color={colors.kitchengramBlack}
        />
      </View>
      <TextInput style={styles.searchInput} value={searchText} onChangeText={setSearchText}
        returnKeyType={'search'} placeholder={`Buscar ${elementName}...`}/>
    </View>
  );
}

export default SearchElements;
