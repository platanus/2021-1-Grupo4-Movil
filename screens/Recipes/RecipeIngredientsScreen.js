import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { View, Text, TextInput, ScrollView } from 'react-native'; // ActionSheetIOS,
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';
import styles from '../../styles/Recipes/ingredientRecipe';
import colors from '../../styles/appColors';
import formatMoney from '../../utils/formatMoney';

/* eslint max-statements: [2, 20] */
function RecipeIngredients(props) {
  const { navigation, route } = props;
  const actualSelection = useStoreState((state) => state.recipes.currentSelectedIngredients);
  const {
    isNewRecipe,
    recipe,
    recipes,
    setRecipes,
  } = route.params;
  const getAllIngredients = useStoreActions((actions) => actions.getIngredients);
  const setIngredientsForRecipe = useStoreActions((actions) => actions.setSelectedRecipeIngredients);
  const selectedIngredients = useStoreState((state) => state.recipes.currentSelectedIngredients);
  const setDeletedIngredient = useStoreActions((actions) => actions.setDeletedRecipeIngredients);
  const [selecteds, setSelecteds] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [currentSearch, setCurrentSearch] = useState('');

  useEffect(() => {
    getAllIngredients()
      .then((resp) => {
        setIngredients(resp);
        const auxSelecteds = selectedIngredients.map((ingredient) => (
          (ingredient.attributes && ingredient.attributes.id) ?
            ingredient.attributes.id.toString() : ingredient.id.toString()
        ));
        setSelecteds(auxSelecteds);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getIngredientsFromSearch() {
    if (currentSearch.length === 0) {
      return ingredients;
    }
    const filter = [];
    ingredients.forEach((ing) => {
      const ingredientLowerCase = ing.attributes.name.toLowerCase();
      const currentSearchLowerCase = currentSearch.toLowerCase();
      if (ingredientLowerCase.includes(currentSearchLowerCase)) {
        filter.push(ing);
      }
    });

    return filter;
  }

  function changeIngredientChecked(id) {
    if (selecteds.includes(id)) {
      const auxSelecteds = selecteds.filter(item => item !== id);
      setSelecteds(auxSelecteds);
    } else {
      const auxSelecteds = [...selecteds];
      auxSelecteds.push(id);
      setSelecteds(auxSelecteds);
    }
  }

  function saveSelectedIngredients() {
    const deleteIngredientsIds = [];
    ingredients.forEach((ingredient) => {
      const includedCondition = selecteds.includes(ingredient.id);
      const indexFoundAndEqualCondition = actualSelection.findIndex(
        (actual) => ((actual.attributes && actual.attributes.id) ?
          actual.attributes.id.toString() === ingredient.id.toString() :
          actual.id.toString() === ingredient.id.toString())) >= 0;
      if (!includedCondition && indexFoundAndEqualCondition) {
        deleteIngredientsIds.push(ingredient.id);
      }
    });
    setDeletedIngredient(deleteIngredientsIds);
    const ingredientsForRecipe = ingredients.filter((ingredient) => selecteds.includes(ingredient.id));
    setIngredientsForRecipe(ingredientsForRecipe);
    const backRoute = (isNewRecipe) ? 'Crear receta' : 'Editar Receta';
    navigation.navigate(backRoute, {
      recipe,
      recipes,
      setRecipes,
    });
  }

  const shownIngredients = getIngredientsFromSearch();

  return (
    <View style={styles.container}>
      <View style={styles.recipeSearcherRow}>
        <Text style={styles.label}>Nombre del ingrediente</Text>
        <TextInput
          style={styles.searcherInput}
          value={currentSearch}
          onChangeText={setCurrentSearch}/>
      </View>
      <ScrollView style={styles.scroll}>
        {
          shownIngredients.map((ingredient, i) => (
            <TouchableOpacity
            key={i}
            onPress={() => {
              changeIngredientChecked(ingredient.id);
            }}
            >
            <View
              style={styles.ingredientRow}
            >
              <View style={styles.ingredientData}>
                <CheckBox
                  checked={selecteds.includes(ingredient.id)}
                  style={styles.checkbox}
                  checkedColor={colors.kitchengramYellow500}
                  checkedIcon = 'check-square'
                  uncheckedColor={colors.kitchengramYellow500}
                  containerStyle= { styles.checkbox }
                  size={30}
                />
                <Text style={styles.name}>
                  {ingredient.attributes.name}
                </Text>
              </View>
              <View style={styles.ingredientPrice}>
                <Text style={styles.price}>
                  {
                    `${formatMoney(
                      ingredient.attributes.price / ingredient.attributes.quantity, '$'
                    )
                    } / ${ingredient.attributes.measure}`
                  }
                </Text>
              </View>
            </View>
            </TouchableOpacity>
          ),
          )}
      </ScrollView>
      <TouchableOpacity
        style={styles.submitIngredients}
        onPress={saveSelectedIngredients}
      >
        <Text style={styles.saveButton}>
            Guardar cambios
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default RecipeIngredients;
