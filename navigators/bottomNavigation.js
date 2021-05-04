import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Ingredients from './ingredientsStack';
// import Ingredients from '../screens/ingredients/IngredientsScreen';
import IngredientsStack from './ingredientsStack';
import Recipes from '../screens/RecipesScreen';
import Menus from '../screens/MenusScreen';
import Profile from '../screens/ProfileScreen';


const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Ingredients" component={Ingredients} />
        <Tab.Screen name="Recipes" component={Recipes} />
        <Tab.Screen name="Menus" component={Menus} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
  );
}