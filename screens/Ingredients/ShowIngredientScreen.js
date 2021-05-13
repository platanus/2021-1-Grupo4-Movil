import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useStoreActions } from 'easy-peasy';

import styles from '../../styles/Ingredients/showStyles';

function ShowIngredient({ navigation, route }) {
  const { ingredient } = route.params;

  const deleteIngredient = useStoreActions((actions) => actions.deleteIngredient);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalAttributeContainer}>
        <Text style={styles.modalName}>
          Nombre
        </Text>
        <Text style={styles.modalValue}>
          {ingredient.attributes.name}
        </Text>
      </View>
      <View style={styles.modalAttributeContainer}>
        <Text style={styles.modalName}>
          Precio
        </Text>
        <Text style={styles.modalValue}>
          {ingredient.attributes.price}
        </Text>
      </View>
      <View style={styles.modalAttributeContainer}>
        <Text style={styles.modalName}>
          Cantidad
        </Text>
        <Text style={styles.modalValue}>
          {ingredient.attributes.quantity}
        </Text>
      </View>
      <View style={styles.modalAttributeContainer}>
        <Text style={styles.modalName}>
          Unidad
        </Text>
        <Text style={styles.modalValue}>
          {ingredient.attributes.measure}
        </Text>
      </View>
      <View style={styles.modalAttributeContainer}>
        <Text style={styles.modalName}>
          Precio por unidad
        </Text>
        <Text style={styles.modalValue}>
          {ingredient.attributes.price}
        </Text>
      </View>
      <View style={styles.modalButtonsContainer}>
        <TouchableOpacity
          style={styles.modalDelete}
          onPress={() => {
            const body = { id: ingredient.id };
            deleteIngredient(body)
              .then(() => {
                navigation.navigate('Ingredientes', { ingredientDeleted: ingredient });
              })
              .catch(() => {
              });
          }}
        >
          <Text style={styles.modalDeleteText}>
            Borrar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalEdit}
          onPress={() => navigation.navigate('Form Ingrediente', {
            isNew: false,
            ingredient,
          })}
        >
          <Text style={styles.modalEditText}>
            Editar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ShowIngredient;
