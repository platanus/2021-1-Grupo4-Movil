import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../styles/appColors';
import styles from '../styles/Recipes/index';
import calculateRecipePrice from '../utils/calculateRecipePrice';
import formatMoney from '../utils/formatMoney';

function RecipeRow(props) {
  const {
    recipe,
    navigation,
    recipes,
    setRecipes,
  } = props;

  return (
    <TouchableOpacity
      style={styles.recipeRow}
      onPress={() => navigation.navigate('Receta', {
        recipe,
        recipes,
        setRecipes,
      })}
      key={recipe.id}>
      <View style={styles.left}>
        <Text style={styles.name} >{(recipe) ? recipe.attributes.name : '---'}</Text>
        <View style={styles.recipeInfo}>
          <Icon name='pie-chart' color={colors.kitchengramGray400} size={18} />
          <Text style = {styles.subtitle}>
            {recipe.attributes.portions} {(recipe.attributes.portions === 1 ? 'porción' : 'porciones')}
          </Text>
        </View>
        <View style={styles.recipeInfo}>
          <Icon name='timer' color={colors.kitchengramGray400} size={18} />
          <Text style = {styles.subtitle}>{recipe.attributes.cookMinutes} minutos</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style = {styles.price}>{formatMoney(Math.round(calculateRecipePrice(recipe)), '$')}</Text>
        <Icon name='chevron-right' color={colors.kitchengramGray400} size={20} />
      </View>
    </TouchableOpacity>
  );
}

export default RecipeRow;
