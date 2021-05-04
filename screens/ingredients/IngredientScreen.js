import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, Modal, Alert, Pressable } from 'react-native';

import styles from '../../styles/authStyles';


export default function Ingredient({navigation}) {
  return (
    <View style={styles.container}>
      <Text>One Ingredient Screen</Text>
      <Button
        title="Edit"
        onPress={() => navigation.navigate('EditIngredient')}
      />
    </View>
    
  );
}