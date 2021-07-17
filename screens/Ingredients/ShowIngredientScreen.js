import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useStoreActions } from 'easy-peasy';
import formatMoney from '../../utils/formatMoney';
import styles from '../../styles/showStyles';
import DeleteModal from '../../components/DeleteModal';

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerTitle: ingredient.attributes.name,
    });
  }, [navigation, ingredient.attributes.name]);

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

  console.log('Ingrediente: ', ingredient.attributes.otherMeasures.data)

  return (
    <View style={styles.container}>
      <DeleteModal
        show={showModal}
        setShow={setShowModal}
        dependencies={dependencies}
        handleDelete={handleSubmitDelete}
        title={'Eliminar ingrediente'}
        description={'Este ingrediente se encuentra en las siguientes recetas:'}
        sureMessage={'¿Estás seguro que deseas eliminar este ingrediente?'}/>
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
          Minimo Inventario
        </Text>
        <Text style={styles.value}>
          {Number(ingredient.attributes.minimumQuantity)}
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
