import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Recipes from '../screens/recipes/RecipesScreen';
import Recipe from '../screens/recipes/SingleRecipeScreen';
import newRecipe from '../screens/recipes/NewRecipeScreen';
import colors from '../styles/appColors';
import EditRecipe from '../screens/recipes/EditRecipeScreen';

const MainRecipesStack = createStackNavigator();

function RecipesStackScreen() {
  return (
    <MainRecipesStack.Navigator initialRouteName="Recetas" >
      <MainRecipesStack.Screen name="Recetas" component={Recipes} />
      <MainRecipesStack.Screen name="Receta" component={Recipe} />
      <MainRecipesStack.Screen name="Crear receta" component={newRecipe} />
      <MainRecipesStack.Screen name="Editar Receta" component={EditRecipe} />
    </MainRecipesStack.Navigator>
  );
}

export default RecipesStackScreen;
