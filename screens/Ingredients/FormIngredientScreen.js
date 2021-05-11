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
    name = '',
    price = 0,
    quantity = 0,
    measure = '',
    sku = '',
    currency = 'CLP',
  } = route.params;

  const createIngredient = useStoreActions((actions) => actions.createIngredient);
  const editIngredient = useStoreActions((actions) => actions.createIngredient);

  const [nameState, setNameState] = useState(name);
  const [priceState, setPriceState] = useState(price);
  const [quantityState, setQuantityState] = useState(quantity);
  const [measureState, setMeasureState] = useState(measure);

  function handleSubmit() {
    const ingredient = {
      name: nameState,
      sku,
      price: priceState,
      currency,
      quantity: quantityState,
      measure: measureState,
    };
    if (nameState.length > 0 &&
      priceState > 0 &&
      quantityState > 0 &&
      measureState.length > 0) {
      const body = {
        ingredient,
      };
      if (isNew) {
        createIngredient(body)
          .then(() => {
            navigation.navigate('Ingredients');
          })
          .catch((err) => {
          });
      } else {
        editIngredient(body)
          .then(() => {
            navigation.navigate('Ingredients', {
              fromEdit: true,
              ingredientFromEdit: ingredient,
            });
          })
          .catch((err) => {
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
          onChangeText={(text) => setNameState(text)}
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
          onChangeText={(text) => setPriceState(text)}
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
          onChangeText={(text) => setQuantityState(text)}
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
          onValueChange={(value) => setMeasureState(value)}
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
