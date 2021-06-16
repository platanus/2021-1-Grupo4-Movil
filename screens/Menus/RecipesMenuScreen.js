import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RecipeRow from '../../components/menuSelectRecipesRow';
import calculateRecipePrice from '../../utils/calculateRecipePrice';
import styles from '../../styles/Menus/form';

/* eslint max-statements: [2, 15] */
function RecipesMenu({ navigation }) {
  const getRecipes = useStoreActions((actions) => actions.getRecipes);
  const setSelectedRecipesData = useStoreActions((actions) => actions.setMenuSelectedRecipes);
  const selectedRecipes = useStoreState((state) => state.menus.selectedRecipes);

  const [recipes, setRecipes] = useState([]);
  const [recipesToShow, setRecipesToShow] = useState([]);
  const [searchText, setSearchText] = useState('');

  function recipeInitialData(recipe) {
    const data = selectedRecipes.find((selected) => recipe.id.toString() === selected.id.toString());
    if (data) return data;

    return {
      id: recipe.id,
      name: recipe.attributes.name,
      price: calculateRecipePrice(recipe),
      selected: false,
      quantity: 1,
      quantityText: '1',
      isNew: true,
    };
  }

  useEffect(() => {
    getRecipes()
      .then((resp) => {
        const newRecipes = resp.map((recipe) => recipeInitialData(recipe));
        setRecipes(newRecipes);
      });
  }, []);

  useEffect(() => {
    if (searchText) {
      setRecipesToShow(recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchText.toLowerCase())));
    } else setRecipesToShow(recipes);
  }, [searchText, recipes]);

  function handleRecipeChange(id, newRecipeAttributes) {
    const toChangeRecipeIndex = recipes.findIndex((recipe) => recipe.id === id);
    if (toChangeRecipeIndex === -1) return;
    setRecipes([
      ...recipes.slice(0, toChangeRecipeIndex),
      { ...recipes[toChangeRecipeIndex], ...newRecipeAttributes },
      ...recipes.slice(toChangeRecipeIndex + 1),
    ]);
  }

  function saveChanges() {
    setSelectedRecipesData(recipes.filter((recipe) => !recipe.isNew || recipe.selected));
    navigation.goBack();
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainDataView}>
        <Text style={styles.subtitle}>Nombre de la receta</Text>
        <TextInput style={styles.textInput} value={searchText} onChangeText={setSearchText}/>
      </View>
      <ScrollView>
        <View>
          {recipesToShow.map((recipe) => (
            <RecipeRow
              key={recipe.id}
              recipe={recipe}
              select={true}
              handleRecipeChange={(newAttributes) => handleRecipeChange(recipe.id, newAttributes)}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.menuButtonsRow}>
        <View style={styles.oneButtonContainer}>
          <TouchableOpacity
            style={[styles.lineButton, styles.actionButton]}
            onPress={saveChanges}>
            <Text style={styles.actionText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default RecipesMenu;
