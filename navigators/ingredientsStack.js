import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import IngredientsScreen from '../screens/Ingredients/IngredientsScreen';
import IngredientScreen from '../screens/Ingredients/IngredientScreen';
import FormIngredientScreen from '../screens/Ingredients/FormIngredientScreen';

const MainIngredientsStack = createStackNavigator();

function IngredientsStackScreen() {
  return (
    <MainIngredientsStack.Navigator initialRouteName="Ingredients" >
      <MainIngredientsStack.Screen name="Ingredients" component={IngredientsScreen} />
      <MainIngredientsStack.Screen name="FormIngredient" component={FormIngredientScreen} />
      <MainIngredientsStack.Screen name="OneIngredient" component={IngredientScreen} />
    </MainIngredientsStack.Navigator>
  );
}

export default IngredientsStackScreen;
