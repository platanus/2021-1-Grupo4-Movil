/* eslint-disable max-statements */
import React, {
  useLayoutEffect,
  useEffect,
  useState,
} from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';

import {
  useStoreActions,
  useStoreState,
} from 'easy-peasy';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/Ingredients/indexStyles';
import colors from '../../styles/appColors';
import formatMoney from '../../utils/formatMoney';
import InventoryModal from '../../components/InventoryModal';
import SearchElements from '../../components/searchElementsAndFilter';

function IndexIngredients({ navigation }) {
  const getIngredients = useStoreActions((actions) => actions.getIngredients);
  const updateInventory = useStoreActions((actions) => actions.updateInventory);
  const setIngredientsInventory = useStoreActions((actions) => actions.setIngredientsInventory);
  const ingredientsInventory = useStoreState((state) => state.ingredientsInventory);
  const setHasToGetRecipes = useStoreActions((actions) => actions.setHasToGetRecipes);
  const [showModal, setShowModal] = useState(false);

  const [ingredients, setIngredients] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [editableInventories, setEditableInventories] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [ingredientsToShow, setIngredientsToShow] = useState([]);

  function inventoryModifier(event, ingId) {
    if (event >= 0) {
      const newInventoriesAux = { ...ingredientsInventory };
      newInventoriesAux[ingId.toString()] = event;

      setIngredientsInventory(newInventoriesAux);
    }
  }

  function submitInventoryValue(ingredient) {
    const newInventory = Number(ingredientsInventory[ingredient.id.toString()]);
    if (newInventory < 0) {
      Alert.alert('El valor del inventario no puede ser negativo');
    } else {
      const ingredientsPayload = [{ ingredientId: ingredient.id, inventory: newInventory }];
      updateInventory({ ingredients: ingredientsPayload })
        .then(() => {
          const index = ingredients.indexOf(ingredient);
          const ingredientsCopy = [...ingredients];
          ingredientsCopy[index].attributes.inventory = newInventory;
          setIngredients(ingredientsCopy);
        })
        .catch(() => {
        });
    }
  }

  function showInventoryInput(ingredient) {
    const copyEditables = { ...editableInventories };
    copyEditables[ingredient.id.toString()] = !copyEditables[ingredient.id.toString()];

    if (!copyEditables[ingredient.id.toString()] &&
    ingredient.attributes.inventory !== ingredientsInventory[ingredient.id.toString()]) {
      submitInventoryValue(ingredient);
    }
    setEditableInventories(copyEditables);
  }

  useEffect(() => {
    getIngredients()
      .then((res) => {
        setIngredients(res);
        if (res.length === 0) {
          setMounted(true);
        }
      })
      .catch(() => {
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setHasToGetRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients]);

  useEffect(() => {
    if (ingredients.length > 0) {
      const newInventoriesAux = {};
      const editableInventoriesAux = {};
      ingredients.forEach((ingredient) => {
        newInventoriesAux[ingredient.id.toString()] = ingredient.attributes.inventory;
        editableInventoriesAux[ingredient.id.toString()] = false;
      });
      setIngredientsInventory(newInventoriesAux);
      setEditableInventories(editableInventoriesAux);
      setMounted(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients]);

  useLayoutEffect(() => {
    navigation.setOptions({
    // eslint-disable-next-line react/display-name
      headerRight: () => (
        <View style={styles.row}>
          <FontAwesome name='bell-o'
            size={22}
            color={colors.kitchengramWhite}
            style={{ paddingRight: 15, marginTop: 6 }}
            onPress={() =>
              setShowModal(true)}/>
          <Icon name='list'
            size={30}
            color={colors.kitchengramWhite}
            style={{ paddingRight: 15 }}
            onPress={() => navigation.navigate('Inventario Ingrediente', {
              ingredients,
            })}/>
          <Icon name='add'
            size={30}
            color={colors.kitchengramWhite}
            style={{ paddingRight: 10 }}
            onPress={() => navigation.navigate('Nuevo Ingrediente', {
              isNew: true,
              ingredients,
              setIngredients,
            })}/>
        </View>
      ),
    });
  }, [navigation, ingredients]);

  function onRefresh() {
    setRefreshing(true);
    getIngredients()
      .then((res) => {
        setIngredients(res);
      })
      .catch(() => {
      });
    setRefreshing(false);
  }

  if (mounted && ingredients.length) {
    return (
      <View style={styles.container}>
        <InventoryModal
          show={showModal}
          setShow={setShowModal}
          dependencies={ingredients}
          title={'Alerta Inventario Ingredientes'}
          description={'Ingredientes Bajo Inventario Mínimo'}/>
        <SearchElements
          elements={ingredients}
          setFilteredElements={setIngredientsToShow}
          elementName='Ingrediente'/>
        <FlatList
          keyExtractor={(item) => item.id}
          data={ingredientsToShow}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.ingredientRow, styles.even]}
              onPress={() => {
                navigation.navigate('Ingrediente', {
                  ingredient: item,
                  ingredients,
                  setIngredients,
                });
              }}
            >
              <View style={styles.left}>
                <Text style={styles.name}>
                  {item.attributes.name}
                </Text>
                <Text style={styles.measure}>
                  {`${item.attributes.quantity} ${item.attributes.measure}`}
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.price}>
                  {formatMoney(item.attributes.price, '$')}
                </Text>
                <Text style={styles.measure}>
                  {`${formatMoney(
                    item.attributes.price / item.attributes.quantity, '$')
                  } / ${item.attributes.measure}`}
                </Text>
                <View style={styles.inventory}>
                  {editableInventories[item.id] ? (
                    <View style={styles.inventoryEditPanel}>
                      <TouchableOpacity
                        style={styles.decreaseInventoryBtn}
                        onPress={() => inventoryModifier(
                          ingredientsInventory[item.id.toString()] - 1, item.id)}
                      >
                        <Icon
                          name='remove-circle-outline'
                          size={25}
                          color={colors.grayIcon}
                        />
                      </TouchableOpacity>
                      <TextInput
                        style={styles.inventoryInput}
                        keyboardType="number-pad"
                        returnKeyType='done'
                        value={
                          ingredientsInventory[
                            item.id.toString()].toString()
                        }
                        onChangeText={(event) => inventoryModifier(event, item.id)}
                        editable={true}
                      />
                      <TouchableOpacity
                        style={styles.increaseInventoryBtn}
                        onPress={() => inventoryModifier(
                          ingredientsInventory[item.id.toString()] + 1, item.id)}
                      >
                        <Icon
                          name='add-circle-outline'
                          size={25}
                          color={colors.grayIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text
                      style={styles.measure}
                    >
                      {`${ingredientsInventory[item.id.toString()]} un.`}
                    </Text>
                  )}
                  <TouchableOpacity onPress={() => showInventoryInput(item)}>
                    {editableInventories[item.id] ? (
                      <Text style={styles.saveInventoryButton}>
                        Guardar
                      </Text>
                    ) : (
                      <Icon
                        name='create'
                        size={25}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  return (mounted &&
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <Text style={styles.emptyMessage}>
        Aún no tienes ingredientes.
      </Text>
    </ScrollView>
  );
}

export default IndexIngredients;
