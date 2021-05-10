import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Recipes from '../screens/Recipes/RecipesScreen';
import Recipe from '../screens/Recipes/RecipeScreen';

const MainRecipesStack = createStackNavigator();

function RecipesStackScreen() {
  return (
    <MainRecipesStack.Navigator initialRouteName="Recetas" >
      <MainRecipesStack.Screen name="Recetas" component={Recipes} />
      <MainRecipesStack.Screen name="Receta" component={Recipe} />
    </MainRecipesStack.Navigator>
  );
}

export default RecipesStackScreen;
