import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CheckBox, Icon } from 'react-native-elements';
import formatMoney from '../utils/formatMoney';
import styles from '../styles/Menus/form';
import colors from '../styles/appColors';

function SelectRecipeRow({ select, recipe, handleRecipeChange }) {
  function changeRecipeQtyBy(diff) {
    const newQuantity = recipe.quantity + diff;
    if (newQuantity >= 0) handleRecipeChange({ quantity: newQuantity, quantityText: newQuantity.toString() });
  }

  function changeRecipeQtyTo() {
    const newQuantity = Number(recipe.quantityText);
    if (newQuantity >= 0) handleRecipeChange({ quantity: newQuantity });
    else handleRecipeChange({ quantityText: '0' });
  }

  return (
    <View style={styles.recipeRow}>
      <View style={styles.recipeCheckAndQtyRow}>
        { select ?
          <CheckBox
            checked={recipe.selected}
            onPress={() => handleRecipeChange({ selected: !recipe.selected })}
            checkedColor={colors.yellow}
            checkedIcon='check-square'
            uncheckedColor={colors.yellow}/> : null
        }
        <View style={styles.nameandQtyColumn}>
          <Text style={styles.recipeNameText}>{recipe.name}</Text>
          <View style={styles.recipeMoreAndLessRow}>
            <TouchableOpacity
              style={styles.recipeMoreAndLessButton}
              onPress={() => changeRecipeQtyBy(-1)}>
              <Text style={styles.moreAndLessButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.moreAndLessNumberArea}
              value={recipe.quantityText}
              onChangeText={(newQty) => handleRecipeChange({ quantityText: newQty })}
              onEndEditing={changeRecipeQtyTo}
            />
            <TouchableOpacity
              style={styles.recipeMoreAndLessButton}
              onPress={() => changeRecipeQtyBy(1)}>
              <Text style={styles.moreAndLessButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.priceAndRemoveRow}>
        <Text style={styles.recipePriceText}>{formatMoney(Math.round(recipe.price * recipe.quantity), '$ ')}</Text>
        {select ? null :
          <Icon
            name='close'
            onPress={() => handleRecipeChange({ selected: false })}
            size={18}
            color={colors.grayIcon}
          />
        }
      </View>
    </View>
  );
}

export default SelectRecipeRow;
