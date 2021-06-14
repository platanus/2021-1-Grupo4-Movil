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
    isRecipe = false,
  } = props;

  function deleteElement() {
    deleteApi(element.id)
      .then(() => {
        const auxElementsArray = elementsArray.filter(item => item.id !== element.id);
        setElementsArray(auxElementsArray);
        navigation.navigate(indexNavigation);
      })
      .catch(() => {
      });
  }

  return (

    <View>
      {(isRecipe) ? (
        <TouchableOpacity style={[styles.menuOption, styles.edit]}
          onPress={() => navigation.navigate(editNavigation, {
            recipe: element,
            recipes: elementsArray,
            setRecipes: setElementsArray,
          })}>
          <Text style={styles.edit}>Editar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.menuOption, styles.edit]}
          onPress={() => navigation.navigate(editNavigation, {
            menu: element,
            menus: elementsArray,
            setMenus: setElementsArray,
          })}>
          <Text style={styles.edit}>Editar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={[styles.menuOption, styles.delete]}
        onPress={() => Alert.alert('¿Estás seguro?', 'Esta acción es irreversible',
          [{ text: 'Cancelar', onPress: () => { menuVisible(false); }, style: 'default' },
            { text: 'Borrar', onPress: () => {
              deleteElement();
            }, style: 'destructive' }],
        )
        }>
        <Text style={styles.delete}>Borrar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ShowMenuOptions;
