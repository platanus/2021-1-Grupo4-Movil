import React from 'react';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import Recipes from '../screens/recipes/RecipesScreen';
import Recipe from '../screens/recipes/SingleRecipeScreen';
import newRecipe from '../screens/recipes/newRecipeScreen';
import colors from '../styles/appColors';

const MainRecipesStack = createStackNavigator();

function RecipesStackScreen() {
  return (
    <MainRecipesStack.Navigator initialRouteName="Recetas" >
      <MainRecipesStack.Screen name="Recetas" component={Recipes} />
      <MainRecipesStack.Screen name="Receta" component={Recipe} />
      <MainRecipesStack.Screen name="Crear receta" component={newRecipe} />
    </MainRecipesStack.Navigator>
  );
}

export default RecipesStackScreen;
