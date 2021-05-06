import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import IngredientsScreen from '../screens/ingredients/IngredientsScreen';
import NewIngredientScreen from '../screens/ingredients/NewIngredientScreen';
import IngredientScreen from '../screens/ingredients/IngredientScreen';
import EditIngredientScreen from '../screens/ingredients/EditIngredientScreen';

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
