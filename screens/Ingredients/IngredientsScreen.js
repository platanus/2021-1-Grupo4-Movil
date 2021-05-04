import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useStoreActions } from 'easy-peasy';

import styles from '../../styles/Ingredients/indexStyles';

function Ingredients(props) {
  const { setEditIngredient } = props;

  const getIngredients = useStoreActions((actions) => actions.getIngredients);

  function handleSubmit() {
    console.log('Entranding');
    getIngredients();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          Buscar ingredientes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setEditIngredient(true)}
      >
        <Text style={styles.buttonText}>
          Editar Ingredient (?)
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Ingredients;
