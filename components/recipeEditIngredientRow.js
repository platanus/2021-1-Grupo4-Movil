import React, {
  useState,
  useEffect,
} from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../styles/Recipes/formRecipe';
import pickers from '../styles/customPickerStyles';
import formatMoney from '../utils/formatMoney';
import colors from '../styles/appColors';

function IngredientRow(props) {
  const {
    ingredient,
    totalPrice,
    setTotalPrice,
    changeIngredientDataQuantity,
    deleteIngredient,
    handleIngredientChange,
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
  }, [currentQuantity, currentPrice, priceFactor]);

  function changeMeasure(newMeasureName) {
    if (!newMeasureName) return;
    const newMeasure = ingredient.otherMeasures.data.find(measure =>
      measure.attributes.name === newMeasureName).attributes;
    handleIngredientChange({ selectedMeasureName: newMeasure.name, selectedMeasureQuantity: newMeasure.quantity,
      quantity: newMeasure.quantity });
  }

  function quantityRegex(value) {
    const newValueMatch = value.match(/\d+[,|.]{0,1}\d*/);

    return newValueMatch ? newValueMatch[0] : '';
  }

  return (
    <View style={styles.ingredientsList} key={ingredient.id}>
      <View style={{ flex: 1 }}>
        <Text> {ingredient.name}</Text>
      </View>
      <View style={ styles.ingredientTextBox }>
        <View style={styles.sectionQuantity}>
          <TextInput
            style={[styles.sectionQuantityInput, styles.nameMeasureInput]}
            keyboardType='numeric'
            value={currentQuantity}
            onChangeText={(text) => setCurrentQuantity(quantityRegex(text))}
          />

          <View style={[styles.sectionQuantityInput, styles.quantityInput]}>
            <RNPickerSelect
              key={-1}
              style={pickers.customPickerStyles}
              value={ingredient.selectedMeasureName}
              onValueChange={(value) => changeMeasure(value)}
              placeholder={{
                label: 'Selecciona unidad...',
                value: null,
              }}
              items={
                ingredient.otherMeasures.data.map((measure, index) => ({
                  key: index, value: measure.attributes.name, label: measure.attributes.name }))}
              Icon={() => <Icon name='chevron-down' size={22} color={colors.kitchengramGray600} />}
            />
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
