import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
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
  const getIngredientAssociations = useStoreActions((actions) => actions.getIngredientAssociations);
  const [showModal, setShowModal] = useState(false);
  const [dependencies, setDependencies] = useState([]);

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
  function handleGetAssociations() {
    const body = { id: ingredient.id };
    getIngredientAssociations(body)
      .then((res) => {
        setDependencies(res);
        setShowModal(true);
      })
      .catch(() => {
      });
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={showModal}
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
                Eliminar ingrediente
            </Text>
            {(dependencies.length > 0) && (
              <>
                <Text style={styles.modalDescription}>
                  {'Este ingrediente se encuentra en las siguientes recetas:'}
                </Text>
                <ScrollView>
                  {dependencies.map((recipe, i) =>
                    (<Text
                      key={i}
                      style={styles.modalText}>
                      {recipe.name}
                    </Text>))}
                </ScrollView>
              </>)}
            <Text style={styles.modalTitle}>
              ¿Estás seguro que deseas eliminar este ingrediente?
            </Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>
                  No
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setShowModal(false);
                  handleSubmitDelete();
                  navigation.navigate('Ingredientes');
                }}
              >
                <Text style={[styles.buttonText, styles.confirmButtonText]}>
                  Sí, eliminar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
          {ingredient.attributes.otherMeasures.data[0].attributes.quantity}
        </Text>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.name}>
          Unidad
        </Text>
        <Text style={styles.value}>
          {ingredient.attributes.otherMeasures.data[0].attributes.name}
        </Text>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.name}>
          Precio por unidad
        </Text>
        <Text style={styles.value}>
          {`${formatMoney(
            ingredient.attributes.price / ingredient.attributes.otherMeasures.data[0].attributes.quantity, '$')
          } / ${ingredient.attributes.measure}`}
        </Text>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.name}>
          Inventario
        </Text>
        <Text style={styles.value}>
          {Number(ingredient.attributes.inventory)}
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
          onPress={handleGetAssociations}
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
