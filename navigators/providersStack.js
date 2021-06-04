import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IndexProvider from '../screens/Providers/IndexProviderScreen';
import FormProvider from '../screens/Providers/FormProviderScreen';
import ShowProvider from '../screens/Providers/ShowProviderScreen';

const MainProvidersStack = createStackNavigator();

function ProvidersStackScreen() {
  return (
    <MainProvidersStack.Navigator initialRouteName="Providers" >
      <MainProvidersStack.Screen
        name="Proveedores"
        component={IndexProvider}
      />
      <MainProvidersStack.Screen
        name="Nuevo Proveedor"
        component={FormProvider}
      />
      <MainProvidersStack.Screen
        name="Proveedor"
        component={ShowProvider}
      />
      <MainProvidersStack.Screen
        name="Editar Proveedor"
        component={FormProvider}
      />
    </MainProvidersStack.Navigator>
  );
}

export default ProvidersStackScreen;
