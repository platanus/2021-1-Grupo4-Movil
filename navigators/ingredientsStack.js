import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import IndexIngredient from '../screens/Ingredients/IndexIngredientScreen';
import ShowIngredient from '../screens/Ingredients/ShowIngredientScreen';
import FormIngredient from '../screens/Ingredients/FormIngredientScreen';
import SearchIngredient from '../screens/Ingredients/SearchIngredientScreen';

const MainIngredientsStack = createStackNavigator();

function IngredientsStackScreen() {
  return (
    <MainIngredientsStack.Navigator initialRouteName="Ingredients" >
      <MainIngredientsStack.Screen
        name="Ingredientes"
        component={IndexIngredient}
      />
      <MainIngredientsStack.Screen
        name="Ingrediente"
        component={ShowIngredient}
      />
      <MainIngredientsStack.Screen
        name="Nuevo Ingrediente"
        component={FormIngredient}
      />
      <MainIngredientsStack.Screen
        name="Editar Ingrediente"
        component={FormIngredient}
      />
      <MainIngredientsStack.Screen
        name="Buscar Ingrediente"
        component={SearchIngredient}
      />
    </MainIngredientsStack.Navigator>
  );
}

export default IngredientsStackScreen;
