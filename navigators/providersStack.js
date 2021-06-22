import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IndexProvider from '../screens/Providers/IndexProviderScreen';
import FormProvider from '../screens/Providers/FormProviderScreen';
import ShowProvider from '../screens/Providers/ShowProviderScreen';
import colors from '../styles/appColors';
import defaultOptions from '../styles/Headers/defaultOptions';

const MainProvidersStack = createStackNavigator();

function ProvidersStackScreen() {
  return (
    <MainProvidersStack.Navigator initialRouteName="Providers" >
      <MainProvidersStack.Screen
        name="Proveedores"
        component={IndexProvider}
        options={{ headerTintColor: colors.kitchengramWhite,
          headerTitleAlign: 'left',
          headerStyle: { backgroundColor: colors.kitchengramBlack,
          } }}
      />
      <MainProvidersStack.Screen
        name="Nuevo Proveedor"
        component={FormProvider}
        options={defaultOptions}
      />
      <MainProvidersStack.Screen
        name="Proveedor"
        component={ShowProvider}
        options={defaultOptions}
      />
      <MainProvidersStack.Screen
        name="Editar Proveedor"
        component={FormProvider}
        options={defaultOptions}
      />
    </MainProvidersStack.Navigator>
  );
}

export default ProvidersStackScreen;
