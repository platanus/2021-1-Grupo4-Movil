import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import IndexIngredient from '../screens/Ingredients/IndexIngredientScreen';
import ShowIngredient from '../screens/Ingredients/ShowIngredientScreen';
import FormIngredient from '../screens/Ingredients/FormIngredientScreen';
import SearchIngredient from '../screens/Ingredients/SearchIngredientScreen';
import colors from '../styles/appColors';

const MainIngredientsStack = createStackNavigator();

function IngredientsStackScreen() {
  return (
    <MainIngredientsStack.Navigator initialRouteName="Ingredients">
      <MainIngredientsStack.Screen
        name="Ingredientes"
        component={IndexIngredient}
        options={{ headerTintColor: colors.figmaWhite,
          headerTitleAlign: 'left',
          headerStyle: { backgroundColor: colors.figmaBlack,
          } }}
      />
      <MainIngredientsStack.Screen
        name="Ingrediente"
        component={ShowIngredient}
        options={{ headerTintColor: colors.figmaWhite,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.figmaBlack,
          },
          headerBackTitleVisible: false,
        }}
      />
      <MainIngredientsStack.Screen
        name="Nuevo Ingrediente"
        component={FormIngredient}
        options={{ headerTintColor: colors.figmaWhite,
          headerTitleAlign: 'center',
          headerTitle: 'Crear ingrediente',
          headerStyle: { backgroundColor: colors.figmaBlack,
          },
          headerBackTitleVisible: false,
        }}
      />
      <MainIngredientsStack.Screen
        name="Editar Ingrediente"
        component={FormIngredient}
        options={{ headerTintColor: colors.figmaWhite,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.figmaBlack,
          },
          headerBackTitleVisible: false }}
      />
      <MainIngredientsStack.Screen
        name="Buscar Ingrediente"
        component={SearchIngredient}
        options={{ headerTintColor: colors.figmaWhite,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.figmaBlack,
          },
          headerBackTitleVisible: false }}
      />
    </MainIngredientsStack.Navigator>
  );
}

export default IngredientsStackScreen;
