import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function Component() {
  const user = useStoreState((state) => state.user);
  const setUserAction = useStoreActions((actions) => actions.setName);

  return (
    <View>

    </View>
  );
}
