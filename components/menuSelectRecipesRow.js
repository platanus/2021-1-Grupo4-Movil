import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CheckBox, Icon } from 'react-native-elements';
import styles from '../styles/Menus/form';
import colors from '../styles/appColors';

function SelectRecipeRow({ select, recipe, remove, changePrice }) {
  const [quantity, setQuantity] = useState(recipe.quantity);
  const [quantityText, setQuantityText] = useState(recipe.quantityText);
  const [checked, setChecked] = useState(recipe.selected);
  const [price, setPrice] = useState(recipe.price * recipe.quantity);

  function changeQty() {
    setQuantity(Number(quantityText));
    if (!select) changePrice(false);
  }

  function addRecipeQty(diff) {
    const newQuantity = quantity + diff;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      setQuantityText(newQuantity.toString());
      setPrice(newQuantity * recipe.price);
      recipe.quantity = newQuantity;
      recipe.quantityText = newQuantity.toString();
      if (!select) changePrice(false);
    }
  }

  function pressCheckBox() {
    const newValue = !checked;
    setChecked(newValue);
    recipe.selected = newValue;
  }

  return (
    <View style={styles.recipeRow}>
      <View style={styles.recipeCheckAndQtyRow}>
        { select ?
          <CheckBox
            checked={checked}
            onPress={pressCheckBox}
            checkedColor={colors.yellow}
            checkedIcon='check-square'
            uncheckedColor={colors.yellow}/> : null
        }
        <View style={styles.nameandQtyColumn}>
          <Text style={styles.recipeNameText}>{recipe.name}</Text>
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
              onEndEditing={changeQty}
            />
            <TouchableOpacity
              style={styles.recipeMoreAndLessButton}
              onPress={() => addRecipeQty(1)}>
              <Text style={styles.moreAndLessButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.priceAndRemoveRow}>
        <Text style={styles.recipePriceText}>${Math.round(price)}</Text>
        {select ? null : <Icon name='close' onPress={() => remove(recipe.id)} size={18} color={colors.grayIcon}/>}
      </View>
    </View>
  );
}

export default SelectRecipeRow;
