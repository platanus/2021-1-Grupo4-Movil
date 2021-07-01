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
  RefreshControl,
} from 'react-native';

import { useStoreActions } from 'easy-peasy';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Ingredients/indexStyles';
import colors from '../../styles/appColors';
import formatMoney from '../../utils/formatMoney';

function IndexIngredients({ navigation }) {
  const getIngredients = useStoreActions((actions) => actions.getIngredients);
  const updateInventory = useStoreActions((actions) => actions.updateInventory);
  const [ingredients, setIngredients] = useState([]);
  const evenNumber = 2;
  const [mounted, setMounted] = useState(false);
  const [editableInventories, setEditableInventories] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [newInventories, setNewInventories] = useState({});

  function inventoryModifier(event, ingId) {
    const newInventoriesAux = { ...newInventories };
    newInventoriesAux[ingId.toString()] = event;

    setNewInventories(newInventoriesAux);
  }

  function submitInventoryValue(ingredient) {
    const newInventory = Number(newInventories[ingredient.id.toString()]);
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

  function showInventoryInput(ingredient) {
    const copyEditables = { ...editableInventories };
    copyEditables[ingredient.id.toString()] = !copyEditables[ingredient.id.toString()];

    if (!copyEditables[ingredient.id.toString()] &&
    ingredient.attributes.inventory !== newInventories[ingredient.id.toString()]) {
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
    if (ingredients.length > 0) {
      const newInventoriesAux = {};
      const editableInventoriesAux = {};
      ingredients.forEach((ingredient) => {
        newInventoriesAux[ingredient.id.toString()] = ingredient.attributes.inventory;
        editableInventoriesAux[ingredient.id.toString()] = false;
      });
      setNewInventories(newInventoriesAux);
      setEditableInventories(editableInventoriesAux);
      setMounted(true);
    }
  }, [ingredients]);

  useLayoutEffect(() => {
    navigation.setOptions({
    // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Icon name='add'
          size={30}
          color={colors.kitchengramWhite}
          style={{ paddingRight: 10 }}
          onPress={() => navigation.navigate('Nuevo Ingrediente', {
            isNew: true,
            ingredients,
            setIngredients,
          })}/>
      ),
    });
  }, [navigation, ingredients]);

  function onRefresh() {
    setRefreshing(true);
    getIngredients()
      .then((res) => {
        setIngredients(res);
      });
    setRefreshing(false);
  }

  if (mounted && ingredients.length) {
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          {ingredients.map((ingredient, i) => (
            <TouchableOpacity
              style={[styles.ingredientRow, (i % evenNumber === 0) ? styles.even : styles.odd]}
              key={ingredient.id}
              onPress={() => {
                navigation.navigate('Ingrediente', {
                  ingredient,
                  ingredients,
                  setIngredients,
                });
              }}
            >
              <View style={styles.left}>
                <Text style={styles.name}>
                  {ingredient.attributes.name}
                </Text>
                <Text style={styles.measure}>
                  {`${ingredient.attributes.quantity} ${ingredient.attributes.measure}`}
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.price}>
                  {formatMoney(ingredient.attributes.price, '$')}
                </Text>
                <Text style={styles.measure}>
                  {`${formatMoney(
                    ingredient.attributes.price / ingredient.attributes.quantity, '$')
                  } / ${ingredient.attributes.measure}`}
                </Text>
                <View style={styles.inventory}>
                  {editableInventories[ingredient.id] ? (
                    <View style={styles.inventoryEditPanel}>
                      <TouchableOpacity
                        style={styles.decreaseInventoryBtn}
                        onPress={() => inventoryModifier(
                          newInventories[ingredient.id.toString()] - 1, ingredient.id)}
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
                        value={newInventories[ingredient.id.toString()].toString()}
                        onChangeText={(event) => inventoryModifier(event, ingredient.id)}
                        editable={true}
                      />
                      <TouchableOpacity
                        style={styles.increaseInventoryBtn}
                        onPress={() => inventoryModifier(
                          newInventories[ingredient.id.toString()] + 1, ingredient.id)}
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
                      {`${newInventories[ingredient.id.toString()]} un.`}
                    </Text>
                  )}
                  <TouchableOpacity onPress={() => showInventoryInput(ingredient)}>
                    {editableInventories[ingredient.id] ? (
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
          ))}
        </ScrollView>
      </View>
    );
  }

  return (mounted &&
    <Text style={styles.emptyMessage}>
      Aún no tienes ingredientes.
    </Text>
  );
}

export default IndexIngredients;
