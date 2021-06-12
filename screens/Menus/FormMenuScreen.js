import { useStoreActions, useStoreState } from 'easy-peasy';
import { View, Text, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../styles/Menus/form';
import RecipeRow from '../../components/menuSelectRecipesRow';

/* eslint max-statements: [2, 20] */
function MenuForm({ navigation, menu }) {
  const createMenu = useStoreActions((actions) => actions.createMenu);
  const editMenu = useStoreActions((actions) => actions.editMenu);
  const selectedRecipes = useStoreState((state) => state.menus.selectedRecipes);
  const setSelectedRecipes = useStoreActions((actions) => actions.setMenuSelectedRecipes);

  const [menuName, setMenuName] = useState('');
  const [menuPortions, setMenuPortions] = useState('');
  const [menuTotalPrice, setMenuTotalPrice] = useState(0);
  const [menuRecipes, setMenuRecipes] = useState([]);

  function changePrice(start) {
    const recipesData = start ? selectedRecipes : menuRecipes;
    let price = 0;
    recipesData.forEach((recipe) => {
      if (recipe.selected) {
        price += recipe.quantity * recipe.price;
      }
    });
    setMenuTotalPrice(price);
  }

  useEffect(() => {
    setSelectedRecipes([]);
  }, []);

  useEffect(() => {
    setMenuRecipes(JSON.parse(JSON.stringify(selectedRecipes)));
    changePrice(true);
  }, [selectedRecipes]);

  function removeRecipe(recipeId) {
    const auxRecipes = menuRecipes;
    const auxRecipe = auxRecipes.find((recipe) => recipe.id.toString() === recipeId.toString());
    auxRecipe.selected = false;
    setSelectedRecipes(auxRecipes);
  }

  function searchRecipes() {
    setSelectedRecipes(menuRecipes);
    navigation.navigate('Agregar Receta');
  }

  function handleSubmit() {
    const body = {
      name: menuName,
      portions: Number(menuPortions),
    };
    if (!menu) {
      body.menuRecipesAttributes = menuRecipes.filter((recipe) => (recipe.selected))
        .map((recipe) => ({
          recipeId: recipe.id,
          recipeQuantity: recipe.quantity,
        }));
      createMenu(body)
        .then((resp) => {
          navigation.goBack();
        });
    }
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.mainDataView}>
          <Text style={styles.title}>Datos Básicos</Text>
          <Text style={styles.subtitle}>Nombre</Text>
          <TextInput
            style={styles.textInput}
            value={menuName}
            onChangeText={setMenuName}/>
          <Text style={styles.subtitle}>Porciones</Text>
          <TextInput
            style={styles.textInput}
            value={menuPortions}
            onChangeText={setMenuPortions}/>
        </View>
        <View style={styles.selectRecipesRow}>
          <View style={styles.centerView}>
            <Text style={styles.title}>Recetas seleccionadas</Text>
          </View>
          <TouchableOpacity
            onPress={searchRecipes}
            style={[styles.button, styles.searchButton]}>
            <Text style={styles.searchText}>Buscar Recetas</Text>
          </TouchableOpacity>
        </View>
        {menuRecipes.map((recipe) => (recipe.selected ?
          <RecipeRow
            recipe={recipe}
            select={false}
            remove={removeRecipe}
            changePrice={changePrice}
            key={recipe.id}
          /> : null
        ))}
      </ScrollView>
      <View style={styles.totalMenuRow}>
        <Text style={styles.totalPriceText}>Total del Menú</Text>
        <Text style={styles.totalPriceNumber}>${Math.round(menuTotalPrice)}</Text>
      </View>
      <View style={styles.menuButtonsRow}>
        <View style={styles.twoButtonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text>Volver</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.twoButtonContainer}>
          <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.actionButton]}>
            <Text style={styles.actionText}>{menu ? 'Editar Menú' : 'Crear Menú'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default MenuForm;
