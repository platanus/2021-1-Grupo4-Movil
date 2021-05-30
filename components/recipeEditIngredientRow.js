import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/Recipes/newRecipe';

function IngredientRow(props) {
  const { ingredient, totalPrice, setTotalPrice } = props;
  const [currentQuantity, setCurrentQuantity] = useState(ingredient.recipeQuantity.toString());
  const [currentPrice, setCurrentPrice] = useState(ingredient.currentPrice);
  const priceFactor = ingredient.price / ingredient.unitQuantity;

  function changeQuantity() {
    if (currentQuantity === '') {
      setCurrentQuantity('0');
    }
    const lastPrice = currentPrice;
    const newPrice = Number(currentQuantity.replace(',', '.')) * priceFactor;
    setCurrentPrice(newPrice);
    setTotalPrice(totalPrice - lastPrice + newPrice);
    ingredient.newQuantity = Number(currentQuantity.replace(',', '.'));
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
          <Text style={styles.ingredientText}>$ {currentPrice}</Text>
        </View>
      </View>
    </View>
  );
}

export default IngredientRow;
