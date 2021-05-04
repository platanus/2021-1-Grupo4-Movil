import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, Modal, Alert, Pressable } from 'react-native';

import styles from '../../styles/authStyles';

export default function NewIngredient({navigation}) {
  return (
    <View style={styles.container}>
      <Text>New Ingredient View</Text>
    </View>
  );
}