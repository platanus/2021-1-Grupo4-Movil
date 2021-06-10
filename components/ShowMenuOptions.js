import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

import styles from '../styles/showMenuOptionsStyles';

function ShowMenuOptions(props) {
  const {
    navigation,
    menuVisible,
    element,
    elementsArray = [],
    setElementsArray = null,
    editNavigation,
    indexNavigation,
    deleteApi,
    // This two attributes should be deleted in the future
    // Because recipes must be manage locally
    isRecipe = false,
    setLoadRecipes,
  } = props;

  function deleteElement() {
    deleteApi(element.id)
      .then(() => {
        if (isRecipe) {
          setLoadRecipes(true);
          navigation.navigate(indexNavigation, { element });
        } else {
          const auxElementsArray = elementsArray.filter(item => item.id !== element.id);
          setElementsArray(auxElementsArray);
          navigation.navigate(indexNavigation);
        }
      })
      .catch(() => {
      });
  }

  return (
    <View>
      <TouchableOpacity style={styles.menuOption}
        onPress={() => navigation.navigate(editNavigation, element)}>
        <Text style={styles.menuText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuOption}
        onPress={() => Alert.alert('¿Estás seguro?', 'Esta acción es irreversible',
          [{ text: 'No', onPress: () => { menuVisible(false); }, style: 'cancel' },
            { text: 'Si', onPress: () => {
              deleteElement();
            } }],
        )
        }>
        <Text style={styles.menuText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ShowMenuOptions;
