import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IngredientsStack from './ingredientsStack';
import RecipesStack from './recipesStack';
import Menus from '../screens/MenusScreen';
import Profile from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Ingredients" component={IngredientsStack} />
      <Tab.Screen name="Recipes" component={RecipesStack} />
      <Tab.Screen name="Menus" component={Menus} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default HomeTabs;
