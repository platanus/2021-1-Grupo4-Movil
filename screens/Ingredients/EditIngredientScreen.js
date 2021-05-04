import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from '../../styles/Ingredients/editStyles';

function EditIngredient(props) {
  const { setEditIngredient } = props;

  return (
    <View style={styles.container}>
      <View style={styles.logContainer}>
        <Text style={styles.loginText}>
          Nombre
        </Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"/>
        <Text style={styles.loginText}>
          Precio
        </Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"/>
        <Text style={styles.loginText}>
          Cantidad
        </Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"/>
        <Text style={styles.loginText}>
          Unidad
        </Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"/>
        <View style={styles.view_button}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => setEditIngredient(false)}>
            <Text style={styles.buttonText2}>
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button1}>
            <Text style={styles.buttonText1}>
              Editar Ingrediente
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default EditIngredient;
