import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/Recipes/newRecipe';
import formatMoney from '../utils/formatMoney';

function IngredientRow(props) {
  const { ingredient, totalPrice, setTotalPrice, changeIngredientDataQuantity } = props;
  const [currentQuantity, setCurrentQuantity] = useState(ingredient.recipeQuantity.toString());
  const priceFactor = ingredient.price / ingredient.quantity;
  const [currentPrice, setCurrentPrice] = useState(priceFactor * ingredient.recipeQuantity);

  function changeQuantity() {
    if (currentQuantity === '') {
      setCurrentQuantity('0');
    }
    const lastPrice = currentPrice;
    const newPrice = Number(currentQuantity.replace(',', '.')) * priceFactor;
    ingredient.recipeQuantity = newPrice;
    setCurrentPrice(newPrice);
    setTotalPrice(totalPrice - lastPrice + newPrice);
    ingredient.recipeQuantity = Number(currentQuantity.replace(',', '.'));
    changeIngredientDataQuantity(ingredient.id, Number(currentQuantity.replace(',', '.')));
  }

  return (
    <View style={styles.ingredientsList} key={ingredient.id}>
      <View style={ styles.ingredientTextBox }>
        <View style={styles.sectionQuantity}>
          <TextInput
            style={styles.sectionQuantityInput}
            keyboardType='numeric'
            value={currentQuantity}
            onChangeText={setCurrentQuantity}
            onEndEditing={changeQuantity}
          />
          <Text style={styles.ingredientText}>{ingredient.measure}. </Text>
          <Text style={styles.ingredientText}> {ingredient.name}</Text>
        </View>
        <View style={styles.sectionPrice}>
          <Text style={styles.ingredientText}>${Math.round(currentPrice)}</Text>
        </View>
      </View>
    </View>
  );
}

export default IngredientRow;
