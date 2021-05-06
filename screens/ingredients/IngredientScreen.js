import React from 'react';
import { View, Text, Button } from 'react-native';

import styles from '../../styles/authStyles';

function Ingredient({ navigation }) {
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

export default Ingredient;
