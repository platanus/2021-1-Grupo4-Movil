import React, {useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';

import styles from '../../styles/authStyles';

export default function IngredientsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>*** Ingredients ***</Text>
      <Button
        title="Add new Ingredient"
        onPress={() => navigation.navigate('NewIngredient')}
      />
      <Button
        title="One Ingredient"
        onPress={() => navigation.navigate('OneIngredient')}
      />
    </View>
  );
}