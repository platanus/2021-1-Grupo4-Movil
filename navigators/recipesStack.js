import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Recipes from '../screens/Recipes/RecipesScreen';
import Recipe from '../screens/Recipes/SingleRecipeScreen';
import RecipeForm from '../screens/Recipes/FormRecipeScreen';
import RecipeIngredients from '../screens/Recipes/RecipeIngredientsScreen';
import colors from '../styles/appColors';
import defaultOptions from '../styles/Headers/defaultOptions';

const MainRecipesStack = createStackNavigator();

function RecipesStackScreen() {
  return (
    <MainRecipesStack.Navigator initialRouteName="Recetas" >
      <MainRecipesStack.Screen
        name="Recetas"
        component={Recipes}
        options={{ headerTintColor: colors.kitchengramWhite,
          headerTitleAlign: 'left',
          headerStyle: { backgroundColor: colors.kitchengramBlack,
          } }} />
      <MainRecipesStack.Screen
        name="Receta"
        component={Recipe}
        options={defaultOptions} />
      <MainRecipesStack.Screen
        name="Crear receta"
        component={RecipeForm}
        options={defaultOptions} />
      <MainRecipesStack.Screen
        name="Editar Receta"
        component={RecipeForm}
        options={defaultOptions}/>
      <MainRecipesStack.Screen
        name="Buscar ingredientes"
        component={RecipeIngredients}
        options={defaultOptions} />
    </MainRecipesStack.Navigator>
  );
}

export default RecipesStackScreen;
