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
    if (newQuantity > 0) {
      handleRecipeChange({ quantity: newQuantity, quantityText: newQuantity.toString(), selected: true });
    } else if (newQuantity === 0) {
      handleRecipeChange({ quantity: 0, quantityText: '0', selected: false });
    }
  }

  function changeRecipeQtyTo() {
    if (!recipe.quantityText || Number(recipe.quantityText) <= 0) {
      handleRecipeChange({ quantityText: '0', quantity: 0, selected: false });
    } else {
      handleRecipeChange({ quantity: Number(recipe.quantityText), selected: true });
    }
  }

  function pressCheckBox() {
    const newQty = recipe.quantity ? recipe.quantity : 1;
    if (recipe.selected) {
      handleRecipeChange({ selected: false, quantity: 0, quantityText: '0' });
    } else {
      handleRecipeChange({ selected: true, quantity: newQty, quantityText: newQty.toString() });
    }
  }

  return (
    <View style={styles.recipeRow}>
      <View style={styles.recipeCheckAndQtyRow}>
        { select ?
          <CheckBox
            checked={recipe.selected}
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
              onPress={() => changeRecipeQtyBy(-1)}>
              <Text style={styles.moreAndLessButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.moreAndLessNumberArea}
              value={recipe.quantityText}
              onChangeText={(newQty) => handleRecipeChange({ quantityText: newQty })}
              onEndEditing={changeRecipeQtyTo}
              keyboardType="number-pad"
              returnKeyType='done'
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
