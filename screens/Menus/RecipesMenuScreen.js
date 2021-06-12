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

  function saveChanges() {
    const data = recipes.filter((recipe) => !recipe.isNew || recipe.selected);
    setSelectedRecipesData(JSON.parse(JSON.stringify(data)));
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
          {recipes.map((recipe) => (
            <RecipeRow recipe={recipe} select={true} key={recipe.id}/>
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
