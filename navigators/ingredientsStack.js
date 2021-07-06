import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IndexIngredient from '../screens/Ingredients/IndexIngredientScreen';
import ShowIngredient from '../screens/Ingredients/ShowIngredientScreen';
import FormIngredient from '../screens/Ingredients/FormIngredientScreen';
import SearchIngredient from '../screens/Ingredients/SearchIngredientScreen';
import InventoryIngredient from '../screens/Ingredients/InventoryScreen';
import colors from '../styles/appColors';
import defaultOptions from '../styles/Headers/defaultOptions';

const MainIngredientsStack = createStackNavigator();

function IngredientsStackScreen() {
  return (
    <MainIngredientsStack.Navigator initialRouteName="Ingredients">
      <MainIngredientsStack.Screen
        name="Ingredientes"
        component={IndexIngredient}
        options={{ headerTintColor: colors.kitchengramWhite,
          headerTitleAlign: 'left',
          headerStyle: { backgroundColor: colors.kitchengramBlack,
          } }}
      />
      <MainIngredientsStack.Screen
        name="Ingrediente"
        component={ShowIngredient}
        options={defaultOptions}
      />
      <MainIngredientsStack.Screen
        name="Nuevo Ingrediente"
        component={FormIngredient}
        options={defaultOptions}
      />
      <MainIngredientsStack.Screen
        name="Editar Ingrediente"
        component={FormIngredient}
        options={defaultOptions}
      />
      <MainIngredientsStack.Screen
        name="Buscar Ingrediente"
        component={SearchIngredient}
        options={defaultOptions}
      />
      <MainIngredientsStack.Screen
        name="Inventario Ingrediente"
        component={InventoryIngredient}
        options={defaultOptions}
      />
    </MainIngredientsStack.Navigator>
  );
}

export default IngredientsStackScreen;
