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
  const evenNumber = 2;

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
        {ingredients.map((ingredient, i) => (
          <TouchableOpacity
            style={[styles.ingredientRow, (i % evenNumber === 0) ? styles.even : styles.odd]}
            key={ingredient.id}
            onPress={() => {
              navigation.navigate('Show Ingrediente', {
                ingredient,
                ingredients,
                setIngredients,
              });
            }}
          >
            <View style={styles.left}>
              <Text style={styles.name}>
                {ingredient.attributes.name}
              </Text>
              <Text style={styles.measure}>
                {`${ingredient.attributes.quantity} ${ingredient.attributes.measure}`}
              </Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.price}>
                {`$${ingredient.attributes.price}`}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Form Ingrediente', {
          isNew: true,
          ingredients,
          setIngredients,
        })}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default IndexIngredients;
