/* eslint-disable react/display-name */
/* global require */

import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import IngredientsStack from './ingredientsStack';
import RecipesStack from './recipesStack';
import MenusStack from './menusStack';
import ProvidersStack from './providersStack';
import Profile from '../screens/ProfileScreen';
import colors from '../styles/appColors';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator tabBarOptions={{ activeBackgroundColor: colors.kitchengramYellow500,
      inactiveBackgroundColor: colors.kitchengramBlack,
      activeTintColor: colors.kitchengramWhite,
      inactiveTintColor: colors.kitchengramWhite,
      labelPosition: 'below-icon',
      keyboardHidesTabBar: true }}
    >

      <Tab.Screen name="Ingredientes" component={IngredientsStack} options={{ tabBarIcon: () => (
        <Image style={{ width: 30, height: 30 }} source={require('../assets/ingredients.png')} />
      ) }} />

      <Tab.Screen name="Recetas" component={RecipesStack} options={{ tabBarIcon: () => (
        <Image style={{ width: 30, height: 30 }} source={require('../assets/recipes.png')} />
      ) }} />

      <Tab.Screen name="Menus" component={MenusStack} options={{ tabBarIcon: () => (
        <Image style={{ width: 30, height: 30 }} source={require('../assets/menus.png')} />
      ) }} />

      <Tab.Screen name="Proveedores" component={ProvidersStack} options={{ tabBarIcon: () => (
        <Image style={{ width: 30, height: 30 }} source={require('../assets/providers.png')} />
      ) }} />

      <Tab.Screen name="Perfil" component={Profile} options={{ tabBarIcon: () => (
        <Icon name='person-outline'
          size={30}
          color={colors.kitchengramWhite}/>) }} />

    </Tab.Navigator>
  );
}

export default HomeTabs;
