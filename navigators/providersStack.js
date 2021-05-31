import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import IndexProvider from '../screens/Providers/IndexProviderScreen';
import FormProvider from '../screens/Providers/FormProviderScreen';
import colors from '../styles/appColors';
import styles from '../styles/Headers/indexProviderStyles';

const MainProvidersStack = createStackNavigator();

function ProvidersStackScreen() {
  return (
    <MainProvidersStack.Navigator initialRouteName="Providers" >
      <MainProvidersStack.Screen
        name="Proveedores"
        component={IndexProvider}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: colors.headerBackground,
          },
          headerTitle: (
            <View style={styles.headerContainer}>
              <Text style={styles.text}>
                Proveedores
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Nuevo Proveedor')}>
                <Icon name='add'
                  size={30}
                  color={colors.black}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <MainProvidersStack.Screen
        name="Nuevo Proveedor"
        component={FormProvider}
      />
    </MainProvidersStack.Navigator>
  );
}

export default ProvidersStackScreen;
