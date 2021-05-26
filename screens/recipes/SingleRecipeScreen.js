import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, ScrollView, Alert } from 'react-native';

import { Icon } from 'react-native-elements';
import { useStoreActions } from 'easy-peasy';
import colors from '../../styles/appColors';
import styles from '../../styles/Recipes/singleRecipe';
import minutesToHoursText from '../../utils/recipes';

/* eslint max-statements: [2, 20] */
function Recipe(props) {
  const { navigation, route } = props;
  const recipe = route.params;
  const [ingredients, setIngredients] = useState([]);
  const deleteRecipe = useStoreActions((actions) => actions.deleteRecipe);
  const [showMenu, setShowMenu] = useState(false);
  const [recipePrice, setRecipePrice] = useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Icon name='more-vert'
          size={30}
          style={styles.moreVert}
          onPress={() => setShowMenu(!showMenu)}/>
      ),
      headerTitle: recipe.attributes.name,
    });
  }, [navigation, showMenu, recipe.attributes.name]);

  function ingredientInfo(ingredient) {
    return {
      id: ingredient.id,
      name: ingredient.attributes.ingredient.name,
      price: ingredient.attributes.ingredient.price,
      currentPrice: ingredient.attributes.ingredient.price * ingredient.attributes.ingredient_quantity,
      unitQuantity: ingredient.attributes.ingredient.quantity,
      recipeQuantity: ingredient.attributes.ingredient_quantity,
      currentQuantity: ingredient.attributes.ingredient.quantity * ingredient.attributes.ingredient_quantity,
      measure: ingredient.attributes.ingredient.measure,
    };
  }

  useEffect(() => {
    const currentIngredients = [];
    let sum = 0;
    for (let i = 0; i < recipe.attributes.recipe_ingredients.data.length; i++) {
      currentIngredients.push(ingredientInfo(recipe.attributes.recipe_ingredients.data[i]));
      sum += currentIngredients[i].currentPrice;
    }
    setIngredients(currentIngredients);
    setRecipePrice(sum);
  }, [recipe.attributes.recipe_ingredients]);

  return (
    <ScrollView style={styles.mainContainer}>
      {showMenu &&
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuOption}
          onPress={() => navigation.navigate('Editar Receta', { recipe, ingredients })}>
          <Text style={styles.ingredientText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuOption}
          onPress={() => Alert.alert('¿Estás seguro?', 'Esta acción es irreversible',
            [{ text: 'No', onPress: () => { setShowMenu(false); }, style: 'cancel' },
              { text: 'Si', onPress: () => { deleteRecipe(recipe.id); } }],
          )
          }>
          <Text style={styles.ingredientText}>Eliminar</Text>
        </TouchableOpacity>
      </View>}
      <View style={styles.recipeInfoContainer}>
        <View style={styles.recipeInfoRow}>
          <Icon name='timer' color={colors.recipeIcon} size={30} />
          <Text style={styles.infoText}>
            {minutesToHoursText(recipe.attributes.cook_minutes)}
          </Text>
        </View>
        <View style={styles.recipeInfoRow}>
          <Icon name='pie-chart' color={colors.recipeIcon} size={30} />
          <Text style={styles.infoText}>
            {recipe.attributes.portions} {(recipe.attributes.portions === 1 ? 'porción' : 'porciones')}
          </Text>
        </View>
        <View style={styles.recipeInfoRow}>
          <Icon name='attach-money' color={colors.recipeIcon} size={30} />
          <Text style={styles.infoText}> {recipePrice} pesos</Text>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.sectionTitleText}>Ingredientes</Text>

        {ingredients.map((ingredient) =>
          <View style={styles.ingredientsList} key={ingredient.id}>
            <View style={ styles.ingredientTextBox }>
              <Text style={styles.ingredientText}>{ingredient.name}</Text>
              <Text style={styles.ingredientText}>
                $ {ingredient.currentPrice} / {ingredient.currentQuantity} {ingredient.measure}.
              </Text>
            </View>
            <Text>{}</Text>
          </View>,
        )}
      </View>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.sectionTitleText}>Pasos</Text>
        {recipe.attributes.steps.data.map((step, index) => <View key={step.id} style={styles.stepBox}>
          <Text style={styles.stepNumber} >{index + 1}</Text>
          <Text style={styles.stepText}>{step.attributes.description}</Text>
        </View>)}
        {recipe.attributes.steps.data.length === 0 &&
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>No hay pasos disponibles</Text>
        </View>}

      </View>
    </ScrollView>
  );
}

export default Recipe;
