/* eslint-disable max-statements */
/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { useStoreActions } from 'easy-peasy';

import styles from '../../styles/Ingredients/indexStyles';
import FormIngredient from './FormIngredientScreen';

function Ingredients() {
  const getIngredients = useStoreActions((actions) => actions.getIngredients);
  const deleteIngredient = useStoreActions((actions) => actions.deleteIngredient);

  const [ingredients, setIngredients] = useState([]);
  const [rows, setRows] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNewIngredient, setShowNewIngredient] = useState(false);
  const [showEditIngredient, setShowEditIngredient] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [actualIngredient, setActualIngredient] = useState({
    attributes: {
      name: '',
      price: 0,
      quantity: 0,
      measure: '',
    },
  });

  const callIngredientsApi = useCallback(() => {
    getIngredients()
      .then((res) => {
        setIngredients(res);
      })
      .catch((err) => {
        setShowError(true);
        setErrorMessage(err.response.data.message);
      });
  }, [getIngredients]);

  function deleteModal() {
    const body = { actualIngredient };
    deleteIngredient(body)
      .then(() => {
        setModalVisible(false);
        callIngredientsApi();
      })
      .catch((err) => {
        setShowError(true);
        setErrorMessage(err.response.data.message);
      });
  }

  useEffect(() => {
    const auxRows = [];
    const totalRows = 9;
    const evenNumber = 2;
    for (let i = 0;
      (ingredients.length - totalRows < 0) ? i < totalRows : i < ingredients.length;
      i++) {
      auxRows.push(
        <TouchableOpacity
          style={[styles.ingredientRow, (i % evenNumber === 0) ? styles.even : styles.odd]}
          key={ingredients[i] ? ingredients[i].id : 100 + i}
          onPress={() => {
            setModalVisible(true);
            setActualIngredient(ingredients[i]);
          }}
        >
          <View style={styles.left}>
            <Text style={styles.name}>
              {(ingredients[i]) ? ingredients[i].attributes.name : '---'}
            </Text>
            <Text style={styles.measure}>
              {(ingredients[i]) ? `${ingredients[i].attributes.quantity} ${ingredients[i].attributes.measure}` : '---'}
            </Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.price}>
              {(ingredients[i]) ? `$${ingredients[i].attributes.price}` : '----'}
            </Text>
          </View>
        </TouchableOpacity>,
      );
      setRows(auxRows);
    }
  }, [ingredients]);

  useEffect(() => {
    if (!showNewIngredient) {
      callIngredientsApi();
    }
  }, [callIngredientsApi, showNewIngredient]);

  if (showNewIngredient) {
    return (
      <FormIngredient
        isNew={true}
        setShowNewIngredient={setShowNewIngredient}
      />
    );
  }

  if (showEditIngredient) {
    return (
      <FormIngredient
        isNew={false}
        setShowEditIngredient={setShowEditIngredient}
        ingredient={actualIngredient}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalAttributeContainer}>
            <Text style={styles.modalName}>
              Nombre
            </Text>
            <Text style={styles.modalValue}>
              {actualIngredient.attributes.name}
            </Text>
          </View>
          <View style={styles.modalAttributeContainer}>
            <Text style={styles.modalName}>
              Precio
            </Text>
            <Text style={styles.modalValue}>
              {actualIngredient.attributes.price}
            </Text>
          </View>
          <View style={styles.modalAttributeContainer}>
            <Text style={styles.modalName}>
              Cantidad
            </Text>
            <Text style={styles.modalValue}>
              {actualIngredient.attributes.quantity}
            </Text>
          </View>
          <View style={styles.modalAttributeContainer}>
            <Text style={styles.modalName}>
              Unidad
            </Text>
            <Text style={styles.modalValue}>
              {actualIngredient.attributes.measure}
            </Text>
          </View>
          <View style={styles.modalAttributeContainer}>
            <Text style={styles.modalName}>
              Precio por unidad
            </Text>
            <Text style={styles.modalValue}>
              {actualIngredient.attributes.price}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Volver</Text>
          </TouchableOpacity>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={styles.modalDelete}
              onPress={deleteModal}
            >
              <Text style={styles.modalDeleteText}>
                Borrar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalEdit}
              onPress={() => showEditIngredient(true)}
            >
              <Text style={styles.modalEditText}>
                Editar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={[styles.titleRow, styles.title]}>
        <Text style={styles.rowTitle}>
          Ingredientes
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {rows}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowNewIngredient(true)}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
      <View style={styles.navigation}>
        <Text style={styles.navigationText}>Navegación</Text>
      </View>
    </View>
  );
}

export default Ingredients;
