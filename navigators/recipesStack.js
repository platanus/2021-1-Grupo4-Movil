import React from 'react';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import Recipes from '../screens/recipes/RecipesScreen';
import Recipe from '../screens/recipes/SingleRecipeScreen';
import colors from '../styles/appColors';

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
