import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Recipes from '../screens/recipes/RecipesScreen';
import Recipe from '../screens/recipes/SingleRecipeScreen';
import RecipeForm from '../screens/recipes/NewRecipeScreen';
import RecipeIngredients from '../screens/recipes/RecipeIngredientsScreen';
import colors from '../styles/appColors';

const MainRecipesStack = createStackNavigator();

function RecipesStackScreen() {
  return (
    <MainRecipesStack.Navigator initialRouteName="Recetas" >
      <MainRecipesStack.Screen name="Recetas" component={Recipes}
        options={{ headerTintColor: colors.kitchengramWhite,
          headerTitleAlign: 'left',
          headerStyle: { backgroundColor: colors.kitchengramBlack,
          } }} />
      <MainRecipesStack.Screen name="Receta" component={Recipe}
        options={{ headerTintColor: colors.kitchengramWhite,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.kitchengramBlack,
          },
          headerBackTitleVisible: false,
        }} />
      <MainRecipesStack.Screen name="Crear receta" component={RecipeForm}
        options={{ headerTintColor: colors.kitchengramWhite,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.kitchengramBlack,
          },
          headerBackTitleVisible: false,
        }} />
      <MainRecipesStack.Screen name="Editar Receta" component={RecipeForm}
        options={{ headerTintColor: colors.kitchengramWhite,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.kitchengramBlack,
          },
          headerBackTitleVisible: false,
        }}/>
      <MainRecipesStack.Screen name="Buscar ingredientes" component={RecipeIngredients}
        options={{ headerTintColor: colors.kitchengramWhite,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.kitchengramBlack,
          },
          headerBackTitleVisible: false,
        }} />
    </MainRecipesStack.Navigator>
  );
}

export default RecipesStackScreen;
