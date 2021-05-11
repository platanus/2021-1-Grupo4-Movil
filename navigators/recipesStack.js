import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Recipes from '../screens/Recipes/RecipesScreen';
import Recipe from '../screens/Recipes/RecipeScreen';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import colors from '../styles/appColors';
import color from 'color';

const MainRecipesStack = createStackNavigator();

function RecipesStackScreen() {
  return (
    <MainRecipesStack.Navigator initialRouteName="Recetas" >
      <MainRecipesStack.Screen name="Recetas" component={Recipes} />
      <MainRecipesStack.Screen name="Receta"
        options={{
          headerRight: () => (
            <Icon name='more-vert'
              size='30'
              style={{ paddingRight: 8, color: colors.recipeIcon }}
              onPress={() => alert('This is a button!')}/>
          ) }} component={Recipe} />
    </MainRecipesStack.Navigator>
  );
}

export default RecipesStackScreen;
