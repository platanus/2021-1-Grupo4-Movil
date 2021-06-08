import React, { useEffect, useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SelectRecipeRow from '../../components/menuSelectRecipesRow';
import calculateRecipePrice from '../../utils/calculateRecipePrice';
import styles from '../../styles/Menus/form';

function RecipesMenu({ navigation }) {
  const getRecipes = useStoreActions((actions) => actions.getRecipes);
  const setSelectedRecipesData = useStoreActions((actions) => actions.setMenuSelectedRecipes);

  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getRecipes()
      .then((resp) => {
        const newRecipes = resp.map((recipe) => ({
          id: recipe.id,
          name: recipe.attributes.name,
          price: calculateRecipePrice(recipe),
          selected: false,
          quantity: 1,
          quantityText: '1',
          isNew: true,
        }));
        setRecipes(newRecipes);
      });
  }, []);

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
          {recipes.map((recipe) => (
            <SelectRecipeRow recipe={recipe} key={recipe.id}/>
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
