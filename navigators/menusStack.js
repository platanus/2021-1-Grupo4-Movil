import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Menus from '../screens/Menu/MenusScreen';
import Menu from '../screens/Menu/MenuScreen';

const MainMenusStack = createStackNavigator();

function MenusStackScreen() {
  return (
    <MainMenusStack.Navigator initialRouteName="Menus" >
      <MainMenusStack.Screen name="Menus" component={Menus} />
      <MainMenusStack.Screen name="Menu" component={Menu} />
    </MainMenusStack.Navigator>
  );
}

export default MenusStackScreen;

