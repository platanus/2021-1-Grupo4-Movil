import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Menus from '../screens/Menus/MenusScreen';
import Menu from '../screens/Menus/MenuScreen';
import MenuForm from '../screens/Menus/FormMenuScreen';
import RecipesMenu from '../screens/Menus/RecipesMenuScreen';
import colors from '../styles/appColors';
import defaultOptions from '../styles/Headers/defaultOptions';

const MainMenusStack = createStackNavigator();

function MenusStackScreen() {
  return (
    <MainMenusStack.Navigator initialRouteName="Menus" >
      <MainMenusStack.Screen
        name="Menus"
        component={Menus}
        options={{ headerTintColor: colors.kitchengramWhite,
          headerTitleAlign: 'left',
          headerStyle: { backgroundColor: colors.kitchengramBlack,
          } }} />
      <MainMenusStack.Screen
        name="Menu"
        component={Menu}
        options={defaultOptions}
      />
      <MainMenusStack.Screen
        name="Editar Menu"
        component={MenuForm}
        options={defaultOptions}
      />
      <MainMenusStack.Screen
        name="Nuevo Menu"
        component={MenuForm}
        options={defaultOptions}
      />
      <MainMenusStack.Screen
        name="Agregar Receta"
        component={RecipesMenu}
        options={defaultOptions}
      />
    </MainMenusStack.Navigator>
  );
}

export default MenusStackScreen;

