import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import IndexIngredient from '../screens/Ingredients/IndexIngredientScreen';
import ShowIngredient from '../screens/Ingredients/ShowIngredientScreen';
import FormIngredient from '../screens/Ingredients/FormIngredientScreen';

const MainIngredientsStack = createStackNavigator();

function IngredientsStackScreen() {
  return (
    <MainIngredientsStack.Navigator initialRouteName="Ingredients" >
      <MainIngredientsStack.Screen
        name="Ingredientes"
        component={IndexIngredient}
      />
      <MainIngredientsStack.Screen
        name="Show Ingrediente"
        component={ShowIngredient}
      />
      <MainIngredientsStack.Screen
        name="Form Ingrediente"
        component={FormIngredient}
      />
    </MainIngredientsStack.Navigator>
  );
}

export default IngredientsStackScreen;
