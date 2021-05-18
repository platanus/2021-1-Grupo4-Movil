/* eslint-disable react/display-name */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import IngredientsStack from './ingredientsStack';
import RecipesStack from './recipesStack';
import Menus from '../screens/MenusScreen';
import Profile from '../screens/ProfileScreen';
import colors from '../styles/appColors';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Ingredientes" component={IngredientsStack} options={{ tabBarIcon: () => (
        <Icon name='nutrition-outline'
          size={30}
          color={colors.blue}/>) }} />
      <Tab.Screen name="Recetas" component={RecipesStack} options={{ tabBarIcon: () => (
        <Icon name='book-outline'
          size={30}
          color={colors.blue}/>) }} />

      <Tab.Screen name="Menús" component={Menus} options={{ tabBarIcon: () => (
        <Icon name='menu'
          size={30}
          color={colors.blue}/>) }} />

      <Tab.Screen name="Perfil" component={Profile} options={{ tabBarIcon: () => (
        <Icon name='person-outline'
          size={30}
          color={colors.blue}/>) }} />

    </Tab.Navigator>
  );
}

export default HomeTabs;
