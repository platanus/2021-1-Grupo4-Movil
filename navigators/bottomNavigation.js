/* eslint-disable react/display-name */
import React from 'react';
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
    <Tab.Navigator tabBarOptions={{ activeBackgroundColor: colors.figmaYellow500,
      inactiveBackgroundColor: colors.figmaBlack,
      activeTintColor: colors.figmaWhite,
      inactiveTintColor: colors.figmaWhite,
      labelPosition: 'below-icon' }}>

      <Tab.Screen name="Ingredientes" component={IngredientsStack} options={{ tabBarIcon: () => (
        <Icon name='nutrition-outline'
          size={30}
          color={colors.figmaWhite}/>) }} />

      <Tab.Screen name="Recetas" component={RecipesStack} options={{ tabBarIcon: () => (
        <Icon name='book-outline'
          size={30}
          color={colors.figmaWhite}/>) }} />

      <Tab.Screen name="Menus" component={MenusStack} options={{ tabBarIcon: () => (
        <Icon name='menu'
          size={30}
          color={colors.figmaWhite}/>) }} />

      <Tab.Screen name="Proveedores" component={ProvidersStack} options={{ tabBarIcon: () => (
        <Icon name='fast-food-outline'
          size={30}
          color={colors.figmaWhite}/>) }} />

      <Tab.Screen name="Perfil" component={Profile} options={{ tabBarIcon: () => (
        <Icon name='person-outline'
          size={30}
          color={colors.figmaWhite}/>) }} />

    </Tab.Navigator>
  );
}

export default HomeTabs;
