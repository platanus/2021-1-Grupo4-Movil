/* eslint-disable max-statements */
import React, {
  useEffect,
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
    ingredient = null,
  } = route.params;

  const createIngredient = useStoreActions((actions) => actions.createIngredient);
  const editIngredient = useStoreActions((actions) => actions.createIngredient);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmitNew() {
    if (name.length > 0 &&
        price > 0 &&
        quantity > 0 &&
        measure.length > 0) {
      const body = {
        ingredient: {
          name,
          sku: '005',
          price,
          currency: 'CLP',
          quantity,
          measure,
        },
      };
      createIngredient(body)
        .then(() => {
          navigation.navigate('Ingredients');
        })
        .catch((err) => {
          setShowError(true);
          setErrorMessage(err.response.data.message);
        });
    }
  }

  function handleSubmitEdit() {
    if (name.length > 0 &&
        price > 0 &&
        quantity > 0 &&
        measure.length > 0) {
      const body = {
        ingredient: {
          name,
          sku: ingredient.attributes.sku,
          price,
          currency: ingredient.attributes.currency,
          quantity,
          measure,
        },
        actualIngredient: ingredient,
      };
      editIngredient(body)
        .then(() => {
          navigation.navigate('Ingredients', { fromEdit: true });
        })
        .catch((err) => {
          setShowError(true);
          setErrorMessage(err.response.data.message);
        });
    }
  }

  useEffect(() => {
    if (!isNew) {
      setName(ingredient.attributes.name);
      setPrice(ingredient.attributes.price);
      setQuantity(ingredient.attributes.quantity);
      setMeasure(ingredient.attributes.measure);
    }
  }, [isNew, ingredient]);

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
          keyboardType="number-pad"
          placeholder="Precio de ingrediente..."
          value={(price > 0) ? price : ''}
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
          value={(quantity > 0) ? quantity : ''}
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
            () => navigation.navigate('Ingredients') :
            navigation.navigate('Ingredients', { fromEdit: true })}
        >
          <Text style={[styles.buttonText, styles.cancelText]}>
            Cancelar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.confirm]}
          onPress={isNew ? handleSubmitNew : handleSubmitEdit}
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
