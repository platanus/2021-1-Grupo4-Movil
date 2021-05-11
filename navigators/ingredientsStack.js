import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import IngredientsScreen from '../screens/Ingredients/IngredientsScreen';
import NewIngredientScreen from '../screens/Ingredients/NewIngredientScreen';
import IngredientScreen from '../screens/Ingredients/IngredientScreen';
import EditIngredientScreen from '../screens/Ingredients/EditIngredientScreen';

const MainIngredientsStack = createStackNavigator();

function IngredientsStackScreen() {
  return (
    <MainIngredientsStack.Navigator initialRouteName="Ingredients" >
      <MainIngredientsStack.Screen name="Ingredients" component={IngredientsScreen} />
      <MainIngredientsStack.Screen name="NewIngredient" component={NewIngredientScreen} />
      <MainIngredientsStack.Screen name="OneIngredient" component={IngredientScreen} />
      <MainIngredientsStack.Screen name="EditIngredient" component={EditIngredientScreen} />
    </MainIngredientsStack.Navigator>
  );
}

export default IngredientsStackScreen;
