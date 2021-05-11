import React, {
  useEffect,
  useState,
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

let fromEdit = false;
let ingredientFromEdit = {
  attributes: {
    name: '',
    price: 0,
    quantity: 0,
    measure: '',
    sku: '',
    currency: 'CLP',
  },
};

function Ingredients({ navigation, route }) {
  useEffect(() => {
    if (route.params) {
      fromEdit = route.params.fromEdit;
      ingredientFromEdit = route.params.ingredientFromEdit;
    }
  }, [route]);

  const getIngredients = useStoreActions((actions) => actions.getIngredients);
  const deleteIngredient = useStoreActions((actions) => actions.deleteIngredient);

  const [ingredients, setIngredients] = useState([]);
  const [rows, setRows] = useState([]);
  const [modalVisible, setModalVisible] = useState(fromEdit);
  const [actualIngredient, setActualIngredient] = useState(ingredientFromEdit);

  useEffect(() => {
    console.log('listening ingredients');
    console.log(ingredients);
    const auxRows = [];
    const totalRows = 10;
    const evenNumber = 2;
    for (let i = 0;
      (ingredients.length - totalRows < 0) ? i < totalRows : i < ingredients.length;
      i++) {
      auxRows.push(
        <TouchableOpacity
          style={[styles.ingredientRow, (i % evenNumber === 0) ? styles.even : styles.odd]}
          key={ingredients[i] ? ingredients[i].id : i}
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
    getIngredients()
      .then((res) => {
        setIngredients(res);
      })
      .catch((err) => {
      });
  }, [getIngredients]);

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
              onPress={() => {
                const body = { actualIngredient };
                deleteIngredient(body)
                  .then(() => {
                    setModalVisible(false);
                    console.log('------------------------------------------------------------------------------------');
                    console.log(ingredients);
                    ingredients.splice(ingredients.indexOf(actualIngredient), 1);
                    setIngredients(ingredients);
                    console.log('----------------------------------------');
                    console.log(ingredients);
                    console.log('------------------------------------------------------------------------------------');
                  })
                  .catch((err) => {
                  });
              }}
            >
              <Text style={styles.modalDeleteText}>
                Borrar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalEdit}
              onPress={() => navigation.navigate('FormIngredient', {
                isNew: false,
                name: actualIngredient.attributes.name,
                sku: actualIngredient.attributes.sku,
                price: actualIngredient.attributes.price,
                currency: actualIngredient.attributes.currency,
                quantity: actualIngredient.attributes.quantity,
                measure: actualIngredient.attributes.measure,
              })}
            >
              <Text style={styles.modalEditText}>
                Editar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.scrollView}>
        {rows}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('FormIngredient', {
          isNew: true,
        })}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Ingredients;
