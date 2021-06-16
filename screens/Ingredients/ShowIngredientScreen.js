import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { useStoreActions } from 'easy-peasy';
import formatMoney from '../../utils/formatMoney';
import styles from '../../styles/showStyles';

function ShowIngredient({ navigation, route }) {
  const {
    ingredient,
    ingredients,
    setIngredients,
  } = route.params;

  const deleteIngredient = useStoreActions((actions) => actions.deleteIngredient);

  function handleSubmitDelete() {
    const body = { id: ingredient.id };
    deleteIngredient(body)
      .then(() => {
        const auxIngredients = ingredients.filter(item => item.id !== ingredient.id);
        setIngredients(auxIngredients);
        navigation.navigate('Ingredientes', { ingredientDeleted: ingredient });
      })
      .catch(() => {
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.attributeContainer}>
        <Text style={styles.name}>
          Nombre
        </Text>
        <Text style={styles.value}>
          {ingredient.attributes.name}
        </Text>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.name}>
          Precio
        </Text>
        <Text style={styles.value}>
          {formatMoney(ingredient.attributes.price, '$')}
        </Text>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.name}>
          Proveedor
        </Text>
        <Text style={styles.value}>
          {ingredient.attributes.providerName}
        </Text>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.name}>
          Cantidad
        </Text>
        <Text style={styles.value}>
          {ingredient.attributes.otherMeasures.data[
            ingredient.attributes.otherMeasures.data.length - 1
          ].attributes.quantity}
        </Text>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.name}>
          Unidad
        </Text>
        <Text style={styles.value}>
          {ingredient.attributes.otherMeasures.data[
            ingredient.attributes.otherMeasures.data.length - 1
          ].attributes.name}
        </Text>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.name}>
          Precio por unidad
        </Text>
        <Text style={styles.value}>
          {`${formatMoney(
            ingredient.attributes.price / ingredient.attributes.otherMeasures.data[
              ingredient.attributes.otherMeasures.data.length - 1
            ].attributes.quantity, '$')
          } / ${ingredient.attributes.otherMeasures.data[
            ingredient.attributes.otherMeasures.data.length - 1
          ].attributes.name}`}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => navigation.navigate('Editar Ingrediente', {
            isNew: false,
            ingredient,
            ingredients,
            setIngredients,
          })}
        >
          <Text style={styles.editText}>
            Editar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => Alert.alert('¿Estás seguro?', 'Esta acción es irreversible',
            [{ text: 'Cancelar', onPress: () => {}, style: 'default' },
              { text: 'Borrar', onPress: () => {
                handleSubmitDelete();
                navigation.navigate('Ingredientes');
              }, style: 'destructive' }],
          )}
        >
          <Text style={styles.deleteText}>
            Borrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ShowIngredient;
