import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IndexProvider from '../screens/Providers/IndexProviderScreen';

const MainProvidersStack = createStackNavigator();

function ProvidersStackScreen() {
  return (
    <MainProvidersStack.Navigator initialRouteName="Providers" >
      <MainProvidersStack.Screen
        name="Proveedores"
        component={IndexProvider}
      />
    </MainProvidersStack.Navigator>
  );
}

export default ProvidersStackScreen;
