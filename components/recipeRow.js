import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../styles/appColors';
import styles from '../styles/Recipes/index';

function RecipeRow(props) {
  const { recipe, navigation } = props;

  function calculatePrice() {
    let sum = 0;
    for (let k = 0; k < recipe.attributes.recipe_ingredients.data.length; k++) {
      const ingredient = recipe.attributes.recipe_ingredients.data[k].attributes;
      sum += ingredient.ingredient.price * ingredient.ingredient_quantity / ingredient.ingredient.quantity;
    }

    return sum;
  }

  return (
    <TouchableOpacity
      style={styles.recipeRow}
      onPress={() => navigation.navigate('Receta', recipe)}
      key={recipe.id}>
      <View style={styles.left}>
        <Text style={styles.name} >{(recipe) ? recipe.attributes.name : '---'}</Text>
        <View style={styles.recipeInfo}>
          <Icon name='pie-chart' color={colors.recipeIcon} size={23} />
          <Text style = {styles.subtitle}>
            {recipe.attributes.portions} {(recipe.attributes.portions === 1 ? 'porción' : 'porciones')}
          </Text>
        </View>
        <View style={styles.recipeInfo}>
          <Icon name='timer' color={colors.recipeIcon} size={23} />
          <Text style = {styles.subtitle}>{recipe.attributes.cook_minutes} minutos</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style = {styles.price}>${calculatePrice()}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default RecipeRow;
