/* eslint-disable max-statements */
import React, {
  useEffect,
  useState,
} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
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
        <FlatList
          keyExtractor={(item) => item.id}
          data={ingredients}
          renderItem={({ item }) => (
            <TouchableOpacity
              style = {[styles.inventoryRow, styles.odd]}
              disabled
            >
              <View style={styles.left}>
                <Text style={styles.name}>
                  {item.attributes.name}
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
                  {`${item.attributes.inventory} ${item.attributes.measure}`}
                </Text>
                <View style={styles.inventory}>
                  <View style={styles.inventoryEditPanel}>
                    <TouchableOpacity
                      style={styles.decreaseInventoryBtn}
                      onPress={() => inventoryModifier(
                        Number(sumInventories[item.id.toString()]) - 1, item.id, true)}
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
                      value={sumInventories[item.id.toString()].toString()}
                      onChangeText={(event) => inventoryModifier(event, item.id, true)}
                      editable={true}
                    />
                    <TouchableOpacity
                      style={styles.increaseInventoryBtn}
                      onPress={() => inventoryModifier(
                        Number(sumInventories[item.id.toString()]) + 1, item.id, true)}
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
                        Number(subtractionInventories[item.id.toString()]) - 1, item.id, false)}
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
                      value={subtractionInventories[item.id.toString()].toString()}
                      onChangeText={(event) => inventoryModifier(event, item.id, false)}
                      editable={true}
                    />
                    <TouchableOpacity
                      style={styles.increaseInventoryBtn}
                      onPress={() => inventoryModifier(
                        Number(subtractionInventories[item.id.toString()]) + 1, item.id, false)}
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
            </TouchableOpacity>)}
        />
        <View styles = {styles.container2}>
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
