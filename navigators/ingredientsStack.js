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
        options={{ headerTintColor: colors.kitchengramWhite,
          headerTitleAlign: 'left',
          headerStyle: { backgroundColor: colors.kitchengramBlack,
          } }}
      />
      <MainIngredientsStack.Screen
        name="Ingrediente"
        component={ShowIngredient}
        options={{ headerTintColor: colors.kitchengramWhite,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.kitchengramBlack,
          },
          headerBackTitleVisible: false,
        }}
      />
      <MainIngredientsStack.Screen
        name="Nuevo Ingrediente"
        component={FormIngredient}
        options={{ headerTintColor: colors.kitchengramWhite,
          headerTitleAlign: 'center',
          headerTitle: 'Crear ingrediente',
          headerStyle: { backgroundColor: colors.kitchengramBlack,
          },
          headerBackTitleVisible: false,
        }}
      />
      <MainIngredientsStack.Screen
        name="Editar Ingrediente"
        component={FormIngredient}
        options={{ headerTintColor: colors.kitchengramWhite,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.kitchengramBlack,
          },
          headerBackTitleVisible: false }}
      />
      <MainIngredientsStack.Screen
        name="Buscar Ingrediente"
        component={SearchIngredient}
        options={{ headerTintColor: colors.kitchengramWhite,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.kitchengramBlack,
          },
          headerBackTitleVisible: false }}
      />
    </MainIngredientsStack.Navigator>
  );
}

export default IngredientsStackScreen;
