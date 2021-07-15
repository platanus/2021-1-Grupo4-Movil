/* eslint-disable max-statements */
import React, {
  useState,
  useEffect,
} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import { useStoreActions } from 'easy-peasy';

import styles from '../../styles/Ingredients/formStyles';
import pickers from '../../styles/customPickerStyles';
import colors from '../../styles/appColors';
import KeyboardAvoidWrapper from '../../components/KeyboardAvoidWrapper';
import IngredientMeasureRow from '../../components/IngredientMeasureRow';

function FormIngredient({ navigation, route }) {
  const {
    isNew,
    isFromSearch = false,
    ingredient = {
      attributes: {
        name: '',
        price: 0,
        sku: '',
        currency: 'CLP',
        providerName: null,
        inventory: 0,
        minimumQuantity: 0,
      },
    },
    ingredients,
    setIngredients,
  } = route.params;

  const getIngredient = useStoreActions((actions) => actions.getIngredient);
  const createIngredient = useStoreActions((actions) => actions.createIngredient);
  const editIngredient = useStoreActions((actions) => actions.editIngredient);
  const getProviders = useStoreActions((actions) => actions.getProviders);
  const setHasToGetProviders = useStoreActions((actions) => actions.setHasToGetProviders);

  const [name, setName] = useState(ingredient.attributes.name);
  const [price, setPrice] = useState(ingredient.attributes.price);
  const [minimumQuantity, setMinimumQuantity] = useState(ingredient.attributes.minimumQuantity);
  const [measures, setMeasures] = useState(isNew ? [{ id: 0, name: '', quantity: '', isNew: true }] :
    ingredient.attributes.otherMeasures.data.map(thisMeasure => ({
      id: thisMeasure.id,
      name: thisMeasure.attributes.name,
      quantity: thisMeasure.attributes.quantity,
      isNew: false,
      isRemoved: false,
    })));
  const [providerName, setProviderName] = useState(ingredient.attributes.providerName);
  const [providersNames, setProvidersNames] = useState([]);

  useEffect(() => {
    getProviders()
      .then((res) => {
        setProvidersNames(res.map((provider, idx) => (
          {
            label: provider.attributes.name,
            value: provider.attributes.name,
            key: idx,
          }
        )));
      })
      .catch(() => {
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleMeasureChange(id, newMeasureAttributes) {
    const toChangeMeasureIndex = measures.findIndex((thisMeasure) => thisMeasure.id === id);
    if (toChangeMeasureIndex === -1) return;
    setMeasures([
      ...measures.slice(0, toChangeMeasureIndex),
      { ...measures[toChangeMeasureIndex], ...newMeasureAttributes },
      ...measures.slice(toChangeMeasureIndex + 1),
    ]);
  }

  function addNewMeasure() {
    setMeasures([
      ...measures,
      {
        id: Math.max(...measures.map(thisMeasure => Number(thisMeasure.id)), 0) + 1,
        name: '',
        quantity: '',
        isNew: true,
        isRemoved: false,
      },
    ]);
  }

  function measureData(thisMeasure, primary) {
    if (thisMeasure.isNew) {
      if (!thisMeasure.isRemoved) return { name: thisMeasure.name, quantity: thisMeasure.quantity, primary };
    } else if (thisMeasure.isRemoved) return { id: Number(thisMeasure.id), _destroy: true };
    else if (!thisMeasure.isRemoved) return { ...thisMeasure, id: Number(thisMeasure.id), _destroy: false, primary };

    return null;
  }

  function selectMeasuresToModify() {
    return measures.map((thisMeasure, idx) => measureData(thisMeasure, !idx)).filter(thisMeasure => thisMeasure);
  }

  function checkValidValues() {
    const validations = [
      { error: !name.length, message: 'Debes asignar un nombre al ingrediente' },
      { error: price <= 0, message: 'Debes ingresar un precio válido' },
      { error: measures[0].quantity <= 0, message: 'Debes ingresar una cantidad por defecto' },
      { error: !measures[0].name, message: 'Debes ingresar una medida por defecto' },
      ...measures.slice(1).map(thisMeasure => ({
        error: !thisMeasure.isRemoved && !thisMeasure.name,
        message: 'Debes ingresar una medida a la unidad equivalente',
      })),
      ...measures.slice(1).map(thisMeasure => ({
        error: !thisMeasure.isRemoved && !thisMeasure.quantity,
        message: 'Debes ingresar una cantidad válida a la unidad equivalente',
      })),
    ];
    const error = validations.find((validation) => (validation.error));
    if (error) {
      Alert.alert(error.message);

      return false;
    }

    return true;
  }

  function handleSubmitNew() {
    if (!checkValidValues()) return;

    const body = {
      ingredient: {
        name,
        sku: ingredient.attributes.sku,
        price,
        currency: ingredient.attributes.currency,
        ingredientMeasuresAttributes: selectMeasuresToModify(),
        providerName,
        inventory: ingredient.attributes.inventory,
        minimumQuantity,
      },
    };

    createIngredient(body)
      .then((res) => {
        setIngredients([...ingredients, res]);
        if (isFromSearch) {
          setHasToGetProviders();
        }
        navigation.navigate('Ingredientes');
      })
      .catch(() => {
      });
  }

  function handleSubmitEdit() {
    if (!checkValidValues()) return;

    const body = {
      ingredient: {
        name,
        sku: ingredient.attributes.sku,
        price,
        currency: ingredient.attributes.currency,
        ingredientMeasuresAttributes: selectMeasuresToModify(),
        providerName,
        inventory: ingredient.attributes.inventory,
        minimumQuantity,
      },
    };
    editIngredient({ body, id: ingredient.id })
      .then(() => getIngredient({ id: ingredient.id }))
      .then((resp) => {
        const auxIngredients = ingredients.filter(item => item.id !== ingredient.id);
        ingredient.attributes = resp.attributes;
        auxIngredients.push(resp);
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
    <>
      <KeyboardAvoidWrapper>
        <View style={styles.container}>

          {isNew && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Buscar Ingrediente', {
                setName,
                setPrice,
                setProviderName,
                setMeasure: (newMeasure) => handleMeasureChange(measures[0].id, newMeasure),
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
            />
          </View>
          {isFromSearch ? (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Proveedor
              </Text>
              <TextInput
                style={[styles.input, styles.cancelText]}
                value={providerName}
                editable={false}
              />
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Proveedor
              </Text>
              <View style={styles.dropDown}>
                <RNPickerSelect
                  style={pickers.customPickerStyles}
                  key={'0'}
                  placeholder={{
                    label: 'Selecciona proveedor...',
                    value: null,
                  }}
                  value={providerName}
                  onValueChange={(value) => setProviderName(value)}
                  items={providersNames}
                />

              </View>
              <Icon name='chevron-down'
                size={30}
                color={colors.kitchengramGray600}
                style={styles.arrowIcon}
              />
            </View>
          )}
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
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Minimo Inventario
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Minimo inventario ..."
              keyboardType="number-pad"
              returnKeyType='done'
              value={(minimumQuantity) && minimumQuantity.toString()}
              onChangeText={(text) => setMinimumQuantity(text)}
            />
          </View>
          <Text style={styles.measureLabel}>
            Unidad por defecto
          </Text>
          <IngredientMeasureRow
            key={measures[0].id}
            measure={measures[0]}
            handleMeasureChange={(newAttributes) => handleMeasureChange(measures[0].id, newAttributes)}
            isDefault={true}
            hasLabels={true}
          />
          <Text style={styles.measureLabel}>
            Unidades alternativas
          </Text>
          {measures.filter((thisMeasure, index) => !thisMeasure.isRemoved && index).map((thisMeasure, index) => (
            <IngredientMeasureRow
              key={thisMeasure.id}
              measure={thisMeasure}
              handleMeasureChange={(newAttributes) => handleMeasureChange(thisMeasure.id, newAttributes)}
              isDefault={false}
              hasLabels={!index}
            />
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.addUnit]}
              onPress={addNewMeasure}>
              <Text style={[styles.buttonText, styles.confirmText]}>
                Agregar Unidad
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidWrapper>
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
            {isNew ? 'Crear ingrediente' : 'Guardar'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default FormIngredient;
