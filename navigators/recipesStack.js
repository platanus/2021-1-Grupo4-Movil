import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Recipes from '../screens/recipes/RecipesScreen';
import Recipe from '../screens/recipes/SingleRecipeScreen';
import RecipeForm from '../screens/recipes/NewRecipeScreen';
import RecipeIngredients from '../screens/recipes/RecipeIngredientsScreen';

const MainRecipesStack = createStackNavigator();

function RecipesStackScreen() {
  return (
    <MainRecipesStack.Navigator initialRouteName="Recetas" >
      <MainRecipesStack.Screen name="Recetas" component={Recipes} />
      <MainRecipesStack.Screen name="Receta" component={Recipe} />
      <MainRecipesStack.Screen name="Crear receta" component={RecipeForm} />
      <MainRecipesStack.Screen name="Editar Receta" component={RecipeForm} />
      <MainRecipesStack.Screen name="Buscar ingredientes" component={RecipeIngredients} />
    </MainRecipesStack.Navigator>
  );
}

export default RecipesStackScreen;
