import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IndexProvider from '../screens/Providers/IndexProviderScreen';
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
        name="Proveedor"
        component={ShowProvider}
      />
    </MainProvidersStack.Navigator>
  );
}

export default ProvidersStackScreen;
