import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { View, Text, TextInput, ScrollView } from 'react-native'; // ActionSheetIOS,
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';
import styles from '../../styles/Recipes/ingredientRecipe';

/* eslint max-statements: [2, 20] */
function RecipeIngredients(props) {
  const { navigation, route } = props;
  const actualSelection = useStoreState((state) => state.recipes.currentSelectedIngredients);
  const isNewRecipe = route.params;
  const getAllIngredients = useStoreActions((actions) => actions.getIngredients);
  const setIngredientsForRecipe = useStoreActions((actions) => actions.setSelectedRecipeIngredients);
  const setDeletedIngredient = useStoreActions((actions) => actions.setDeletedRecipeIngredients);
  const [selecteds, setSelecteds] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [currentSearch, setCurrentSearch] = useState('');

  useEffect(() => {
    getAllIngredients()
      .then((resp) => {
        setIngredients(resp);
        const idsAll = resp.map((i) => i.id.toString());
        const idsActual = actualSelection.map((i) => i.id.toString());
        const beforeSelecteds = [];
        idsActual.forEach((id) => {
          beforeSelecteds.push(idsAll.indexOf(id));
        });
        setSelecteds(beforeSelecteds);
      });
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

  function addIngredientChecked(i) {
    if (selecteds.includes(i)) {
      const index = selecteds.indexOf(i);
      selecteds.splice(index, 1);
      setSelecteds([].concat(selecteds));
    } else {
      setSelecteds(selecteds.concat(i));
    }
  }

  function saveSelectedIngredients() {
    const deleteIngredientsIds = [];
    for (let i = 0; i < ingredients.length; i++) {
      if (!selecteds.includes(i) &&
        actualSelection.findIndex((actual) => actual.id.toString() === ingredients[i].id.toString()) >= 0
      ) deleteIngredientsIds.push(ingredients[i].id);
    }
    setDeletedIngredient(deleteIngredientsIds);
    const submitIngredients = [];
    selecteds.forEach((index) => {
      submitIngredients.push(ingredients[index]);
    });
    setIngredientsForRecipe(submitIngredients);
    const backRoute = isNewRecipe === null ? 'Crear receta' : 'Editar Receta';
    navigation.navigate(backRoute);
  }

  const shownIngredients = getIngredientsFromSearch();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.recipeSearcherRow}>
          <Text style={styles.label}>Nombre del ingrediente</Text>
          <TextInput
            style={styles.searcherInput}
            value={currentSearch}
            onChangeText={setCurrentSearch}/>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        <ScrollView>
          {
            shownIngredients.map((ing, i) => (
              <View key={i} style={styles.ingredientRow}>
                <View style={styles.ingredientData} key={i}>
                  <CheckBox
                    checked={selecteds.includes(i)}
                    onPress={() => addIngredientChecked(i)}
                    style={styles.checkbox}
                  />
                  <Text style={styles.name}>
                    {ing.attributes.name}
                  </Text>
                </View>
                <View style={styles.ingredientPrice}>
                  <Text style={styles.price}>
                    {`$${Math.round(ing.attributes.price / ing.attributes.quantity)} / ${ing.attributes.measure}`}
                  </Text>
                </View>
              </View>
            ),
            )}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.submitIngredients} onPress={saveSelectedIngredients}>
        <Text style={styles.saveButton}>
          Guardar cambios
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default RecipeIngredients;
