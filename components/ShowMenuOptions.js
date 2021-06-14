import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

import styles from '../styles/Recipes/singleRecipe';

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
      <TouchableOpacity style={[styles.menuOption, styles.edit]}
        onPress={() => navigation.navigate(editNavigation, element)}>
        <Text style={styles.edit}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuOption, styles.delete]}
        onPress={() => Alert.alert('¿Estás seguro?', 'Esta acción es irreversible',
          [{ text: 'Cancelar', onPress: () => { menuVisible(false); }, style: 'default' },
            { text: 'Borrar', onPress: () => {
              deleteElement();
              navigation.navigate(editNavigation, element);
            }, style: 'destructive' }],
        )
        }>
        <Text style={styles.delete}>Borrar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ShowMenuOptions;
