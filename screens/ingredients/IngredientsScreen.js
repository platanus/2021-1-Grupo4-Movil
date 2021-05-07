import React from 'react';
import { View, Text, Button } from 'react-native';

import styles from '../../styles/authStyles';

function Ingredients({ navigation }) {
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

export default Ingredients;
