import React, {
  useState,
  useEffect,
} from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../styles/Recipes/formRecipe';
import formatMoney from '../utils/formatMoney';

function IngredientRow(props) {
  const {
    ingredient,
    totalPrice,
    setTotalPrice,
    changeIngredientDataQuantity,
    deleteIngredient,
  } = props;
  const [currentQuantity, setCurrentQuantity] = useState(ingredient.recipeQuantity.toString());
  const priceFactor = ingredient.price / ingredient.quantity;
  const [currentPrice, setCurrentPrice] = useState(priceFactor * ingredient.recipeQuantity);

  useEffect(() => {
    const lastPrice = currentPrice;
    const newPrice = Number(currentQuantity.replace(',', '.')) * priceFactor;
    ingredient.recipeQuantity = newPrice;
    setCurrentPrice(newPrice);
    setTotalPrice(totalPrice - lastPrice + newPrice);
    ingredient.recipeQuantity = Number(currentQuantity.replace(',', '.'));
    changeIngredientDataQuantity(ingredient.id, Number(currentQuantity.replace(',', '.')));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuantity]);

  function quantityRegex(value) {
    const newValue = value.replace(/[^\d]/g, '');

    return newValue;
  }

  return (
    <View style={styles.ingredientsList} key={ingredient.id}>
      <View style={ styles.ingredientTextBox }>
        <View style={styles.sectionQuantity}>
          <TextInput
            style={styles.sectionQuantityInput}
            keyboardType='numeric'
            value={currentQuantity}
            onChangeText={(text) => setCurrentQuantity(quantityRegex(text))}
          />
          <Text style={styles.ingredientText}>{ingredient.measure}. </Text>
          <View style={{ flex: 1 }}>
            <Text> {ingredient.name}</Text>
          </View>
        </View>
        <View style={styles.sectionPrice}>
          <Text style={styles.singleIngredientPriceText}>{formatMoney(Math.round(currentPrice), '$')}</Text>
        </View>
        <View>
          <Icon name='close' onPress={() => deleteIngredient(ingredient.id)} size={20} />
        </View>
      </View>
    </View>
  );
}

export default IngredientRow;
