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
import Icon from 'react-native-vector-icons/Ionicons';
import { useStoreActions } from 'easy-peasy';

import styles from '../../styles/Ingredients/formStyles';
import pickers from '../../styles/customPickerStyles';
import colors from '../../styles/appColors';

function FormIngredient({ navigation, route }) {
  const {
    isNew,
    isFromSearch = false,
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

  function checkValidValues() {

    const validations =  [
    { error: !name.length, message: "Debes asignar un nombre al ingrediente" },
    { error: price <= 0, message: "Debes ingresar un precio válido" },
    { error: quantity <= 0, message: "Debes ingresar una cantidad válida" },
    { error:  !measure.length, message: "Debes ingresar una medida al ingrediente" },
    ];
    const error = validations.find((validation) => (validation.error))
    if ( error ) alert(error.message); return false;

    return true;

  function handleSubmitNew() {

    if (!checkValidValues()) return;

    const attributes = {
      name,
      sku: ingredient.attributes.sku,
      price,
      currency: ingredient.attributes.currency,
      quantity: (isFromSearch) ? 1 : quantity,
      measure: (isFromSearch) ? 'UN' : measure,
    };
    ingredient.attributes = attributes;
    const body = {
      ingredient: ingredient.attributes,
    };
    createIngredient(body)
      .then((res) => {
        const auxIngredients = [...ingredients];
        auxIngredients.push(res);
        setIngredients(auxIngredients);
        navigation.navigate('Ingredientes');
      })
      .catch(() => {
      });
  }

  function handleSubmitEdit() {

    if (!checkValidValues()) return;

    const attributes = {
      name,
      sku: ingredient.attributes.sku,
      price,
      currency: ingredient.attributes.currency,
      quantity,
      measure,
    };
    ingredient.attributes = attributes;
    const body = {
      ingredient: ingredient.attributes,
    };
    editIngredient({ body, id: ingredient.id })
      .then(() => {
        const auxIngredients = ingredients.filter(item => item.id !== ingredient.id);
        auxIngredients.push(ingredient);
        setIngredients(auxIngredients);
        navigation.navigate('Ingrediente', {
          ingredient,
          ingredients,
          setIngredients,
        });
      })
      .catch(() => {
      });
  }

  return (
    <View style={styles.container}>
      {isNew && (
        <TouchableOpacity
          onPress={() => navigation.navigate('Buscar Ingrediente', {
            setName,
            setPrice,
            setQuantity,
          })}
          style={styles.scrapperButton}>
          <Text style={styles.scrapperButtonText}>
            Buscar ingrediente
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          Nombre
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de ingrediente..."
          value={name}
          onChangeText={(text) => setName(text)}
          editable={!isFromSearch}
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
          returnKeyType='done'
          value={price.toString()}
          onChangeText={(text) => setPrice(text)}
          editable={!isFromSearch}
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
          returnKeyType='done'
          value={quantity.toString()}
          onChangeText={(text) => setQuantity(text)}
          editable={!isFromSearch}
        />
      </View>
      {(!isFromSearch) && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Unidad
          </Text>
          <View style={styles.dropDown}>
            <RNPickerSelect
              style={pickers.customPickerStyles}
              key={'0'}
              placeholder={{
                label: 'Selecciona unidad...',
                value: '',
              }}
              value={measure}
              onValueChange={(value) => setMeasure(value)}
              items={[
                { label: 'Kg', value: 'Kg', key: '0' },
                { label: 'Gr', value: 'Gr', key: '1' },
                { label: 'L', value: 'L', key: '2' },
                { label: 'Ml', value: 'Ml', key: '3' },
              ]}
            />

          </View>
          <Icon name='chevron-down'
            size={30}
            color={colors.kitchengramGray600}
            style={styles.arrowIcon}
          />
        </View>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancel]}
          onPress={isNew ?
            () => navigation.navigate('Ingredientes') :
            () => navigation.navigate('Ingrediente')}
        >
          <Text style={[styles.buttonText, styles.cancelText]}>
            {(isNew) ? 'Volver' : 'Cancelar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.confirm]}
          onPress={(isNew) ? handleSubmitNew : handleSubmitEdit}
        >
          <Text style={[styles.buttonText, styles.confirmText]}>
            {isNew ? 'Crear ingrediente' : 'Editar ingrediente'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FormIngredient;
