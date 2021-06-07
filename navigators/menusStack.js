import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Menus from '../screens/Menus/MenusScreen';
import Menu from '../screens/Menus/MenuScreen';
import MenuForm from '../screens/Menus/FormMenuScreen';
import RecipesMenu from '../screens/Menus/RecipesMenuScreen';

const MainMenusStack = createStackNavigator();

function MenusStackScreen() {
  return (
    <MainMenusStack.Navigator initialRouteName="Menus" >
      <MainMenusStack.Screen name="Menus" component={Menus} />
      <MainMenusStack.Screen name="Menu" component={Menu} />
      <MainMenusStack.Screen name="Editar Menu" component={MenuForm} />
      <MainMenusStack.Screen name="Nuevo Menu" component={MenuForm} />
      <MainMenusStack.Screen name="Agregar Receta" component={RecipesMenu} />
    </MainMenusStack.Navigator>
  );
}

export default MenusStackScreen;

