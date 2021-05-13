import React, {
  useState,
} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useStoreActions } from 'easy-peasy';

import styles from '../../styles/Ingredients/formStyles';
import customPickerStyles from '../../styles/customPickerStyles';

function FormIngredient({ navigation, route }) {
  const {
    isNew,
    ingredient = {
      attributes: {
        name: '',
        price: 0,
        quantity: 0,
        measure: '',
        sku: '',
        currency: 'CLP',
      },
    },
    ingredients,
    setIngredients,
  } = route.params;

  const createIngredient = useStoreActions((actions) => actions.createIngredient);
  const editIngredient = useStoreActions((actions) => actions.editIngredient);

  const [name, setName] = useState(ingredient.attributes.name);
  const [price, setPrice] = useState(ingredient.attributes.price);
  const [quantity, setQuantity] = useState(ingredient.attributes.quantity);
  const [measure, setMeasure] = useState(ingredient.attributes.measure);

  function handleSubmit() {
    const attributes = {
      name,
      sku: ingredient.attributes.sku,
      price,
      currency: ingredient.attributes.currency,
      quantity,
      measure,
    };
    ingredient.attributes = attributes;
    if (name.length > 0 &&
      price > 0 &&
      quantity > 0 &&
      measure.length > 0) {
      const body = {
        ingredient: ingredient.attributes,
      };
      if (isNew) {
        createIngredient(body)
          .then((res) => {
            ingredients.push(res);
            setIngredients(ingredients);
            navigation.navigate('Ingredientes');
          })
          .catch(() => {
          });
      } else {
        editIngredient({ body, id: ingredient.id })
          .then(() => {
            const auxIngredients = ingredients.filter(item => item.id !== ingredient.id);
            auxIngredients.push(ingredient);
            setIngredients(auxIngredients);
            navigation.navigate('Show Ingrediente', {
              ingredient,
              ingredients,
              setIngredients,
            });
          })
          .catch(() => {
          });
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          Nombre
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de ingrediente..."
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          Precio
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Precio de ingrediente..."
          keyboardType="number-pad"
          value={price.toString()}
          onChangeText={(text) => setPrice(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          Cantidad
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Cantidad de ingrediente..."
          keyboardType="number-pad"
          value={quantity.toString()}
          onChangeText={(text) => setQuantity(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          Unidad
        </Text>
        <RNPickerSelect
          style={customPickerStyles}
          key={'0'}
          placeholder={{
            label: 'Selecciona unidad...',
            value: '',
          }}
          value={measure}
          onValueChange={(value) => setMeasure(value)}
          items={[
            { label: 'gr', value: 'gr', key: '0' },
            { label: 'kg', value: 'kg', key: '1' },
            { label: 'ml', value: 'ml', key: '2' },
            { label: 'L', value: 'L', key: '3' },
          ]}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancel]}
          onPress={isNew ?
            () => navigation.navigate('Ingredientes') :
            () => navigation.navigate('Show Ingrediente')}
        >
          <Text style={[styles.buttonText, styles.cancelText]}>
            Cancelar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.confirm]}
          onPress={handleSubmit}
        >
          <Text style={[styles.buttonText, styles.confirmText]}>
            {isNew ? 'Agregar ingrediente' : 'Editar ingrediente'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FormIngredient;
