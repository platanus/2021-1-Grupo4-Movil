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
  const setInventory = useStoreActions((actions) => actions.setIngredientInventory);
  const [ingredients, setIngredients] = useState([]);
  const evenNumber = 2;
  const [mounted, setMounted] = useState(false);
  const [editableInventories, setEditableInventories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  function inventoryModifier(adder, ingId) {
    const newIngredients = [...ingredients];

    newIngredients.forEach((ing) => {
      if (ing.id === ingId && ing.attributes.inventory >= 0) {
        ing.attributes.inventory = adder;
      }
    });

    setIngredients(newIngredients);
  }

  function setInventoryInIngredient(event, ingId) {
    const newIngredients = [...ingredients];
    const quantity = event.replace(/[^\d]/g, '');

    newIngredients.forEach((ing) => {
      if (ing.id === ingId && ing.attributes.inventory >= 0) {
        ing.attributes.inventory = Number(quantity);
      }
    });
    setIngredients(newIngredients);
  }

  function formatIngredientMeasure(otherMeasures) {
    const ingredientMeasuresAttributes = otherMeasures.data.map((object) => object.attributes);

    return ingredientMeasuresAttributes;
  }

  async function submitInventoryValue(ingredient) {
    const attributes = {
      providerName: ingredient.attributes.provider_name,
      name: ingredient.attributes.name,
      sku: ingredient.attributes.sku,
      price: ingredient.attributes.price,
      currency: ingredient.attributes.currency,
      quantity: ingredient.attributes.quantity,
      measure: ingredient.attributes.measure,
      inventory: ingredient.attributes.inventory,
      ingredientMeasuresAttributes: formatIngredientMeasure(ingredient.attributes.other_measures),
    };
    const body = {
      ingredient: attributes,
    };
    await setInventory({ body, id: ingredient.id })
      .catch((err) => {
      });
  }

  function showInventoryInput(index) {
    const copyEditables = [...editableInventories];
    if (copyEditables[index]) {
      copyEditables[index] = false;
    } else {
      copyEditables[index] = true;
      submitInventoryValue(ingredients[index]);
    }
    setEditableInventories(copyEditables);
  }

  useEffect(() => {
    getIngredients()
      .then((res) => {
        setIngredients(res);
        setEditableInventories(res);
        setMounted(true);
      })
      .catch(() => {
      });
  }, [getIngredients]);

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
  if (ingredients.length) {
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
                  { editableInventories[i] ?
                    <Text
                      style={styles.measure}
                    >
                      {`${ingredient.attributes.inventory} un.`}
                    </Text> :
                    <View style={styles.inventoryEditPanel}>
                      <TouchableOpacity
                        style={styles.decreaseInventoryBtn}
                        onPress={() => inventoryModifier(
                          ingredient.attributes.inventory - 1, ingredient.id)}
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
                        value={ingredient.attributes.inventory.toString()}
                        onChangeText={(event) => setInventoryInIngredient(event, ingredient.id)}
                        editable={true}
                      />
                      <TouchableOpacity
                        style={styles.increaseInventoryBtn}
                        onPress={() => inventoryModifier(
                          ingredient.attributes.inventory + 1, ingredient.id)}
                      >
                        <Icon
                          name='add-circle-outline'
                          size={25}
                          color={colors.grayIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                  <TouchableOpacity
                    onPress={() => showInventoryInput(i)}
                  >{editableInventories[i] ?
                      <Icon
                        name='create'
                        size={25}
                      /> :
                      <Text style={styles.saveInventoryButton}>
                    Guardar
                      </Text>
                    }
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
