/* eslint-disable max-statements */
import React, {
  useEffect,
  useState,
} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import {
  useStoreActions,
  useStoreState,
} from 'easy-peasy';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/appColors';
import styles from '../../styles/Ingredients/InventoryStyles';

function InventoryIngredient({ navigation, route }) {
  const {
    ingredients,
  } = route.params;

  const setIngredientsInventory = useStoreActions((actions) => actions.setIngredientsInventory);
  const ingredientsInventory = useStoreState((state) => state.ingredientsInventory);

  const updateInventory = useStoreActions((actions) => actions.updateInventory);
  const [sumInventories, setSumInventories] = useState({});
  const colorNumber = 2;
  const [subtractionInventories, setSubtractionInventories] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (ingredients.length > 0) {
      const sumInventoriesAux = {};
      const subtractionInventoriesAux = {};
      ingredients.forEach((ingredient) => {
        sumInventoriesAux[ingredient.id.toString()] = 0;
        subtractionInventoriesAux[ingredient.id.toString()] = 0;
      });
      setSumInventories(sumInventoriesAux);
      setSubtractionInventories(subtractionInventoriesAux);
    }
    setMounted(true);
  }, [ingredients]);

  function inventoryModifier(event, ingId, isSum) {
    if (Number(event) < 0) return;

    if (isSum) {
      const aux = { ...sumInventories };
      aux[ingId.toString()] = event;
      setSumInventories(aux);
    } else {
      const aux = { ... subtractionInventories };
      aux[ingId.toString()] = event;
      setSubtractionInventories(aux);
    }
  }

  function submitInventory() {
    const payload = [];
    const inventoriesCopy = { ...ingredientsInventory };
    ingredients.forEach((ingredient) => {
      const changeNumber = sumInventories[ingredient.id.toString()] - subtractionInventories[ingredient.id.toString()];
      if (changeNumber !== 0) {
        if (ingredient.attributes.inventory + changeNumber > 0) {
          const newInventory = ingredient.attributes.inventory + changeNumber;
          const ingredientPayload = {
            ingredientId: ingredient.id,
            inventory: newInventory,
          };
          inventoriesCopy[ingredient.id.toString()] = newInventory;
          payload.push(ingredientPayload);
        } else {
          const ingredientPayload = {
            ingredientId: ingredient.id,
            inventory: 0,
          };
          inventoriesCopy[ingredient.id.toString()] = 0;
          payload.push(ingredientPayload);
        }
      }
    });
    if (payload.length > 0) {
      updateInventory({ ingredients: payload })
        .then(() => {
          setIngredientsInventory(inventoriesCopy);
          navigation.navigate('Ingredientes');
        })
        .catch(() => {
        });
    }
  }

  if (mounted && ingredients.length) {
    return (
      <View style={styles.container}>
        <ScrollView>
          {ingredients.map((ingredient, i) => (
            <TouchableOpacity
              style = {[styles.inventoryRow, (i % colorNumber === 0) ? styles.even : styles.odd]}
              key={ingredient.id}
              disabled
            >
              <View style={styles.left}>
                <Text style={styles.name}>
                  {ingredient.attributes.name}
                </Text>
                <Text style={styles.text}>
                  Aumenta en
                </Text>
                <Text style={styles.text}>
                  Disminuye en
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.measure}>
                  {`${ingredient.attributes.inventory} ${ingredient.attributes.measure}`}
                </Text>
                <View style={styles.inventory}>
                  <View style={styles.inventoryEditPanel}>
                    <TouchableOpacity
                      style={styles.decreaseInventoryBtn}
                      onPress={() => inventoryModifier(
                        sumInventories[ingredient.id.toString()] - 1, ingredient.id, true)}
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
                      value={sumInventories[ingredient.id.toString()].toString()}
                      onChangeText={(event) => inventoryModifier(event, ingredient.id, true)}
                      editable={true}
                    />
                    <TouchableOpacity
                      style={styles.increaseInventoryBtn}
                      onPress={() => inventoryModifier(
                        sumInventories[ingredient.id.toString()] + 1, ingredient.id, true)}
                    >
                      <Icon
                        name='add-circle-outline'
                        size={25}
                        color={colors.grayIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.inventory}>
                  <View style={styles.inventoryEditPanel}>
                    <TouchableOpacity
                      style={styles.decreaseInventoryBtn}
                      onPress={() => inventoryModifier(
                        subtractionInventories[ingredient.id.toString()] - 1, ingredient.id, false)}
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
                      value={subtractionInventories[ingredient.id.toString()].toString()}
                      onChangeText={(event) => inventoryModifier(event, ingredient.id, false)}
                      editable={true}
                    />
                    <TouchableOpacity
                      style={styles.increaseInventoryBtn}
                      onPress={() => inventoryModifier(
                        subtractionInventories[ingredient.id.toString()] + 1, ingredient.id, false)}
                    >
                      <Icon
                        name='add-circle-outline'
                        size={25}
                        color={colors.grayIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View styles = {styles.containerCentered}>
          <TouchableOpacity
            style={styles.buttonAccept}
            onPress={submitInventory}
          >
            <Text style={styles.acceptButtonText}>
              Guardar cambios
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }

  return (mounted) && (
    <Text style={styles.emptyMessage}>
      No tienes ingredientes
    </Text>
  );
}

export default InventoryIngredient;
