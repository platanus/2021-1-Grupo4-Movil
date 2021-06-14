import { useStoreActions, useStoreState } from 'easy-peasy';
import { View, Text, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../styles/Menus/form';
import RecipeRow from '../../components/menuSelectRecipesRow';
import calculateRecipePrice from '../../utils/calculateRecipePrice';
import formatMoney from '../../utils/formatMoney';

/* eslint max-statements: [2, 20] */
function MenuForm({ navigation, route }) {
  const menu = route.params.menu ? route.params.menu : null;

  const createMenu = useStoreActions((actions) => actions.createMenu);
  const editMenu = useStoreActions((actions) => actions.editMenu);
  const getMenu = useStoreActions((actions) => actions.getMenu);
  const globalMenus = useStoreState((state) => state.menus.menus);
  const setGlobalMenus = useStoreActions((actions) => actions.setMenus);
  const selectedRecipes = useStoreState((state) => state.menus.selectedRecipes);
  const setSelectedRecipes = useStoreActions((actions) => actions.setMenuSelectedRecipes);

  const [menuName, setMenuName] = useState(menu && menu.attributes.name ? menu.attributes.name : '');
  const [menuPortions, setMenuPortions] = useState(menu && menu.attributes.portions ?
    menu.attributes.portions.toString() : '');
  const [menuTotalPrice, setMenuTotalPrice] = useState(0);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (menu) {
      setSelectedRecipes(
        menu.attributes.menu_recipes.data.map((menuRecipe) => ({
          id: menuRecipe.attributes.recipe.id,
          menuRecipeId: Number(menuRecipe.id),
          name: menuRecipe.attributes.recipe.name,
          price: calculateRecipePrice({ attributes: menuRecipe.attributes.recipe }),
          selected: true,
          quantity: menuRecipe.attributes.recipe_quantity,
          quantityText: menuRecipe.attributes.recipe_quantity.toString(),
          initialQuantity: menuRecipe.attributes.recipe_quantity,
          isNew: false,
        })),
      );
    } else {
      setSelectedRecipes([]);
    }
  }, []);

  useEffect(() => {
    setRecipes(selectedRecipes);
  }, [selectedRecipes]);

  useEffect(() => {
    let price = 0;
    recipes.forEach((recipe) => {
      if (recipe.selected) price += recipe.quantity * recipe.price;
    });
    setMenuTotalPrice(price);
  }, [recipes]);

  function handleRecipeChange(id, newRecipeAttributes) {
    const toChangeRecipeIndex = recipes.findIndex((recipe) => recipe.id === id);
    if (toChangeRecipeIndex === -1) return;
    setRecipes([
      ...recipes.slice(0, toChangeRecipeIndex),
      { ...recipes[toChangeRecipeIndex], ...newRecipeAttributes },
      ...recipes.slice(toChangeRecipeIndex + 1),
    ]);
  }

  function searchRecipes() {
    setSelectedRecipes(recipes);
    navigation.navigate('Agregar Receta');
  }

  function handleRecipeFinalChange(recipe) {
    if (recipe.isNew && recipe.selected) return { recipeId: recipe.id, recipeQuantity: recipe.quantity };
    if (!recipe.isNew && !recipe.selected) return { id: recipe.menuRecipeId, _destroy: true, recipeId: recipe.id };
    if (!recipe.isNew && recipe.selected && recipe.quantity !== recipe.initialQuantity) {
      return { id: recipe.menuRecipeId, recipeQuantity: recipe.quantity, _destroy: false, recipeId: recipe.id };
    }

    return null;
  }

  function handleSubmit() {
    if (!menuName) return;
    const body = {
      name: menuName,
      portions: Number(menuPortions),
    };
    if (menu) {
      body.menuRecipesAttributes = recipes.map((recipe) => handleRecipeFinalChange(recipe)).filter(recipe => !!recipe);
      editMenu({ id: menu.id, body })
        .then(() => getMenu({ id: menu.id }))
        .then((resp) => {
          const toChangeMenueIndex = globalMenus.findIndex((otherMenu) => otherMenu.id === menu.id);
          setGlobalMenus([
            ...globalMenus.slice(0, toChangeMenueIndex),
            resp,
            ...globalMenus.slice(toChangeMenueIndex + 1),
          ]);
          const numberScreensBack = 2;
          navigation.pop(numberScreensBack);
        });
    } else {
      body.menuRecipesAttributes = recipes.filter((recipe) => (recipe.selected))
        .map((recipe) => ({
          recipeId: recipe.id,
          recipeQuantity: recipe.quantity,
        }));
      createMenu(body)
        .then((resp) => {
          setGlobalMenus([...globalMenus, resp.data]);
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
            keyboardType="number-pad"
            returnKeyType='done'
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
        {recipes.map((recipe) => (recipe.selected ?
          <RecipeRow
            key={recipe.id}
            recipe={recipe}
            handleRecipeChange={(newAttributes) => handleRecipeChange(recipe.id, newAttributes)}
            select={false}
          /> : null
        ))}
      </ScrollView>
      <View style={styles.totalMenuRow}>
        <Text style={styles.totalPriceText}>Total del Menú</Text>
        <Text style={styles.totalPriceNumber}>{formatMoney(Math.round(menuTotalPrice), '$ ')}</Text>
      </View>
      <View style={styles.menuButtonsRow}>
        <View style={styles.twoButtonContainer}>
          <TouchableOpacity onPress={navigation.goBack} style={styles.button}>
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
