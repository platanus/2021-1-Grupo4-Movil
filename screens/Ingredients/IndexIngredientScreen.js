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
import { useStoreActions } from 'easy-peasy';

import styles from '../../styles/Ingredients/indexStyles';

function IndexIngredients({ navigation }) {
  const getIngredients = useStoreActions((actions) => actions.getIngredients);

  const [ingredients, setIngredients] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const auxRows = [];
    const totalRows = 10;
    const evenNumber = 2;
    for (let i = 0;
      (ingredients.length - totalRows < 0) ? i < totalRows : i < ingredients.length;
      i++) {
      auxRows.push(
        <TouchableOpacity
          style={[styles.ingredientRow, (i % evenNumber === 0) ? styles.even : styles.odd]}
          key={ingredients[i] ? ingredients[i].id : i}
          onPress={() => {
            navigation.navigate('Show Ingrediente', { ingredient: ingredients[i] });
          }}
        >
          <View style={styles.left}>
            <Text style={styles.name}>
              {(ingredients[i]) ? ingredients[i].attributes.name : '---'}
            </Text>
            <Text style={styles.measure}>
              {(ingredients[i]) ? `${ingredients[i].attributes.quantity} ${ingredients[i].attributes.measure}` : '---'}
            </Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.price}>
              {(ingredients[i]) ? `$${ingredients[i].attributes.price}` : '----'}
            </Text>
          </View>
        </TouchableOpacity>,
      );
      setRows(auxRows);
    }
  }, [ingredients, navigation]);

  useEffect(() => {
    getIngredients()
      .then((res) => {
        setIngredients(res);
      })
      .catch(() => {
      });
  }, [getIngredients]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {rows}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Form Ingrediente', {
          isNew: true,
        })}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default IndexIngredients;
