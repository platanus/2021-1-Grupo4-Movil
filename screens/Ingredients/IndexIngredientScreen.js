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
  const [editableInventories, setEditableInventories] = useState([]);

  const inventoryModifier = (adder, ingId) => {
    const newIngredients = [...ingredients];

    newIngredients.forEach((ing) => {
      if (ing.id === ingId && ing.attributes.inventory >= 0) {
        ing.attributes.inventory = adder;
      }
    });

    setIngredients(newIngredients);
  }

  const showInventoryInput = (index) => {
    const copyEditables = [...editableInventories];
    if (copyEditables[index]) {
      copyEditables[index] = false;
    } else {
      copyEditables[index] = true;
      submitInventoryValue(ingredients[index]);
    }
    setEditableInventories(copyEditables);
  };

  const setInventoryInIngredient = (event, ingId) => {
    const newIngredients = [...ingredients];

    newIngredients.map((ing) => {
      if (ing.id === ingId && ing.attributes.inventory >= 0) {
        ing.attributes.inventory = Number(event);
      }
    });
    setIngredients(newIngredients);
  };

  const submitInventoryValue = async (ingredient) => {
    const attributes = {
      // eslint-disable-next-line
      provider_name: ingredient.attributes.provider_name,
      name: ingredient.attributes.name,
      sku: ingredient.attributes.sku,
      price: ingredient.attributes.price,
      currency: ingredient.attributes.currency,
      quantity: ingredient.attributes.quantity,
      measure: ingredient.attributes.measure,
      inventory: ingredient.attributes.inventory,
      // eslint-disable-next-line
      ingredient_measures_attributes: formatIngredientMeasure(ingredient.attributes.other_measures)
    };
    const body = {
      ingredient: attributes,
    };
    await setInventory({ body, id: ingredient.id });
  };

  const formatIngredientMeasure = (otherMeasures) => {
    const ingredientMeasuresAttributes = otherMeasures.data.map((object) => object.attributes);

    return ingredientMeasuresAttributes;
  };

  useEffect(() => {
    getIngredients()
      .then((res) => {
        setIngredients(res);
        setEditableInventories(res)
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

  return (
    <View style={styles.container}>
      <ScrollView>
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
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
                  <Icon
                    name='create'
                    size={25}
                    color='green'
                  />
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

export default IndexIngredients;
