import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import colors from '../styles/appColors';

import styles from '../styles/spinnerStyles';

function Spinner() {
  return (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator
        size="large"
        color={colors.kitchengramYellow500}
      />
      <Text style={styles.activityIndicatorText}>
        Cargando
      </Text>
    </View>
  );
}
export default Spinner;
