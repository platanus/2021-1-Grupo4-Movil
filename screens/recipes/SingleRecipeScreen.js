import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, View, Text, ScrollView, Alert } from 'react-native';

import { Icon } from 'react-native-elements';
import { useStoreActions } from 'easy-peasy';
import colors from '../../styles/appColors';
import styles from '../../styles/Recipes/singleRecipe';
import minutesToHoursText from '../../utils/recipes';
import calculateRecipePrice from '../../utils/calculateRecipePrice';
import ShowMenuOptions from '../../components/ShowMenuOptions';
import formatMoney from '../../utils/formatMoney';

/* eslint max-statements: [2, 20] */
function Recipe(props) {
  const { navigation, route } = props;
  const recipe = route.params;
  const [ingredients, setIngredients] = useState([]);
  const deleteRecipe = useStoreActions((actions) => actions.deleteRecipe);
  const [showMenu, setShowMenu] = useState(false);
  const setLoadRecipes = useStoreActions((actions) => actions.setLoadRecipes);

  const scrollRef = useRef();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Icon name='more-vert'
          size={30}
          style={styles.moreVert}
          color={colors.figmaWhite}
          onPress={() => {
            setShowMenu(!showMenu);
            scrollRef.current.scrollTo({
              y: 0,
              animated: true,
            });
          }}/>
      ),
      headerTitle: recipe.attributes.name,
    });
  }, [navigation, showMenu, recipe.attributes.name]);

  function ingredientInfo(ingredient) {
    return {
      id: ingredient.id,
      name: ingredient.attributes.ingredient.name,
      price: ingredient.attributes.ingredient.price,
      currentPrice: ingredient.attributes.ingredient.price * ingredient.attributes.ingredient_quantity /
        ingredient.attributes.ingredient.quantity,
      unitQuantity: ingredient.attributes.ingredient.quantity,
      recipeQuantity: ingredient.attributes.ingredient_quantity,
      measure: ingredient.attributes.ingredient.measure,
    };
  }

  useEffect(() => {
    setIngredients(
      recipe.attributes.recipe_ingredients.data.map(
        (ingredient) => ingredientInfo(ingredient),
      ),
    );
  }, [recipe.attributes.recipe_ingredients]);

  return (
<<<<<<< HEAD
    <ScrollView style={styles.mainContainer}>
      {showMenu && (
        <ShowMenuOptions
          navigation={navigation}
          menuVisible={setShowMenu}
          element={recipe}
          editNavigation={'Editar Receta'}
          indexNavigation={'Recetas'}
          deleteApi={deleteRecipe}
          isRecipe
          setLoadRecipes={setLoadRecipes}
        />
      )}
=======
    <ScrollView style={styles.mainContainer} ref={scrollRef}>
      {showMenu &&
      <View>
        <TouchableOpacity style={[styles.menuOption, styles.edit]}
          onPress={() => navigation.navigate('Editar Receta', recipe)}>
          <Text style={styles.edit}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuOption, styles.delete]}
          onPress={() => Alert.alert('¿Estás seguro?', 'Esta acción es irreversible',
            [{ text: 'Cancelar', onPress: () => { setShowMenu(false); }, style: 'default' },
              { text: 'Borrar', onPress: () => {
                deleteRecipe(recipe.id);
                setLoadRecipes(true);
                navigation.navigate('Recetas', { recipe });
              }, style: 'destructive' }],
          )
          }>
          <Text style={styles.delete}>Borrar</Text>
        </TouchableOpacity>
      </View>}
>>>>>>> refactor(RecipeForm): update UI design in create and edit form and show menu
      <View style={styles.recipeInfoContainer}>
        <View style={styles.recipeInfoRow}>
          <Icon name='pie-chart' color={colors.figmaGray600} size={25} />
          <Text style={styles.infoText}>
            {recipe.attributes.portions} {(recipe.attributes.portions === 1 ? 'porción' : 'porciones')}
          </Text>
        </View>
        <View style={styles.recipeInfoRow}>
          <Icon name='timer' color={colors.figmaGray600} size={25} />
          <Text style={styles.infoText}>
            {minutesToHoursText(recipe.attributes.cook_minutes)}
          </Text>
        </View>
        <View style={styles.recipeInfoRow}>
          <Icon name='attach-money' color={colors.figmaGray600} size={25} />
          <Text style={styles.infoText}>{formatMoney(Math.round(calculateRecipePrice(recipe)))} pesos</Text>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.sectionTitleText}>Ingredientes</Text>

        {ingredients.map((ingredient) =>
          <View style={styles.ingredientsList} key={ingredient.id}>
            <View style={ styles.ingredientTextBox }>
              <Text style={styles.ingredientTextLeft}>{ingredient.name}</Text>
              <Text style={styles.ingredientTextRight}>
                {ingredient.recipeQuantity} {ingredient.measure}.
              </Text>
            </View>
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
