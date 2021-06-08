import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import styles from '../styles/Menus/form';
import colors from '../styles/appColors';

function RecipeRow({ recipe }) {
  const [quantity, setQuantity] = useState(1);
  const [quantityText, setQuantityText] = useState('1');

  function addRecipeQty(diff) {
    const newQuantity = quantity + diff;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      setQuantityText(newQuantity.toString());
    }
  }

  return (
    <View style={styles.recipeRow}>
      <View style={styles.nameandQtyColumn}>
        <Text style={styles.recipeNameText}>Nombre Receta</Text>
        <View style={styles.recipeMoreAndLessRow}>
          <TouchableOpacity
            style={styles.recipeMoreAndLessButton}
            onPress={() => addRecipeQty(-1)}>
            <Text style={styles.moreAndLessButtonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.moreAndLessNumberArea}
            value={quantityText}
            onChangeText={setQuantityText}
            onEndEditing={() => setQuantity(Number(quantityText))}
          />
          <TouchableOpacity
            style={styles.recipeMoreAndLessButton}
            onPress={() => addRecipeQty(1)}>
            <Text style={styles.moreAndLessButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.priceAndRemoveRow}>
        <Text style={styles.recipePriceText}>$XX.XXX</Text>
        <Icon name='close' size={18} color={colors.grayIcon}/>
      </View>
    </View>
  );
}

export default RecipeRow;
