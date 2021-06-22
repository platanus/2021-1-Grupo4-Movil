import React from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from '../styles/keyboardAvoidStyles';

export default function KeyboardAvoidWrapper({ children }) {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidView}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      // eslint-disable-next-line no-magic-numbers
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>

  );
}
