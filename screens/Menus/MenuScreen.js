/* eslint-disable max-statements */
import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import {
  useStoreActions,
  useStoreState,
} from 'easy-peasy';

import colors from '../../styles/appColors';
import styles from '../../styles/Menus/showStyles';

import calculateRecipePrice from '../../utils/calculateRecipePrice';
import formatMoney from '../../utils/formatMoney';
import createExcel from '../../utils/excelMaker';
import copyList from '../../utils/listToClipboard';

import ShowMenuOptions from '../../components/ShowMenuOptions';

function Menu(props) {
  const {
    navigation,
    route,
  } = props;

  const deleteMenu = useStoreActions((actions) => actions.deleteMenu);
  const setGlobalMenus = useStoreActions((actions) => actions.setMenus);
  const setIngredientsInventory = useStoreActions((actions) => actions.setIngredientsInventory);
  const reduceInventory = useStoreActions((actions) => actions.reduceInventory);
  const ingredientsInventory = useStoreState((state) => state.ingredientsInventory);
  const getShoppingList = useStoreActions((actions) => actions.getShoppingList);

  const {
    menu,
    menuPrice,
    menus,
  } = route.params;

  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const [alertIngredients, setAlertIngredients] = useState({});
  const [newIngredientsInventory, setNewIngredientsInventory] = useState({});
  const [confirmReduceInventory, setConfirmReduceInventory] = useState(false);
  const [confirmReduceInventoryModal, setConfirmReduceInventoryModal] = useState(false);
  const [allIngredientsEmpty, setAllIngredientsEmpty] = useState(false);
  const [reduceInventorySuccessful, setReduceInventorySuccessful] = useState(false);

  useEffect(() => {
    if (confirmReduceInventory) {
      const ingredientsInventoryCopy = { ...ingredientsInventory };
      Object.keys(newIngredientsInventory).forEach((id) => {
        ingredientsInventoryCopy[id] = newIngredientsInventory[id].quantity < 0 ?
          0 : newIngredientsInventory[id].quantity;
      });
      reduceInventory({ id: menu.id })
        .then(() => {
          setIngredientsInventory(ingredientsInventoryCopy);
          setReduceInventorySuccessful(true);
        })
        .catch(() => {
        });
    }
    setConfirmReduceInventory(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmReduceInventory]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.navigate('Menus')}
          tintColor={colors.kitchengramWhite}
          labelVisible={false}/>
      ),
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Icon
          name='more-vert'
          size={30}
          style={styles.moreVert}
          color={colors.kitchengramWhite}
          onPress={() => setShowMenuOptions(!showMenuOptions)}/>
      ),
      headerTitle: menu.attributes.name,
    });
  }, [navigation, showMenuOptions, menu.attributes.name]);

  function reduceInventorySubmit() {
    const newIngredientsInventoryCopy = {};
    const alertIngredientsCopy = {};
    let totalIngredients = 0;
    menu.attributes.menuRecipes.data.forEach((recipe) => {
      recipe.attributes.recipe.recipeIngredients.data.forEach((ingredient) => {
        const id = ingredient.attributes.ingredient.id.toString();
        let newInventory = 0;
        if (Object.keys(newIngredientsInventoryCopy).includes(id)) {
          newInventory = parseFloat(
            newIngredientsInventoryCopy[id].quantity) - ingredient.attributes.ingredientQuantity;
        } else {
          totalIngredients += 1;
          newInventory = parseFloat(ingredientsInventory[id]) - ingredient.attributes.ingredientQuantity;
        }
        newIngredientsInventoryCopy[id] = {
          // eslint-disable-next-line no-magic-numbers
          quantity: Math.round(newInventory * 100) / 100,
          measure: ingredient.attributes.ingredient.measure,
          name: ingredient.attributes.ingredient.name,
        };
        if (newInventory < 0) {
          alertIngredientsCopy[ingredient.attributes.ingredient.name] = {
            id,
            // eslint-disable-next-line no-magic-numbers
            quantity: Math.abs(Math.round(newInventory * 100) / 100),
            measure: ingredient.attributes.ingredient.measure,
          };
        }
      });
    });
    if (Object.keys(alertIngredientsCopy).length === totalIngredients) {
      setAllIngredientsEmpty(true);
    }
    setNewIngredientsInventory(newIngredientsInventoryCopy);
    setAlertIngredients(alertIngredientsCopy);
    setConfirmReduceInventoryModal(true);
  }

  function copyShoppingListToClipboard() {
    if (!(menu.attributes.menuRecipes.data.length > 0)) return;

    getShoppingList({ id: menu.id })
      .then((res) => {
        copyList(res);
      })
      .catch((err) => Alert.alert(err));
  }

  function exportShoppingList() {
    if (!(menu.attributes.menuRecipes.data.length > 0)) return;
    getShoppingList({ id: menu.id })
      .then((res) => {
        createExcel(res);
      })
      .catch((err) => Alert.alert(err));
  }

  return (
    <View style={styles.container}>
      {showMenuOptions && (
        <ShowMenuOptions
          navigation={navigation}
          menuVisible={setShowMenuOptions}
          element={{ menu, id: menu.id }}
          elementsArray={menus}
          setElementsArray={setGlobalMenus}
          editNavigation={'Editar Menu'}
          indexNavigation={'Menus'}
          deleteApi={deleteMenu}
        />
      )}
      <Modal
        visible={reduceInventorySuccessful}
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, styles.modalViewSuccesful]}>
            <Text style={styles.modalTitle}>
              Reducción de inventario exitosa
            </Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setReduceInventorySuccessful(false)}
              >
                <Text style={styles.confirmButtonText}>
                  Aceptar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={confirmReduceInventoryModal}
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {(!allIngredientsEmpty) &&
            (
              <>
                <Text style={styles.modalTitle}>
                  Ingredientes a modificar
                </Text>
                <ScrollView persistentScrollbar={true} fadingEdgeLength={80} style={styles.modalScrollView}>
                  {Object.keys(newIngredientsInventory).map((key, i) =>
                    (!Object.keys(alertIngredients).includes(newIngredientsInventory[key].name)) && (
                      <View key={i.toString()}>
                        <Text
                          style={[styles.modalText, styles.bold]}
                        >
                          {`${newIngredientsInventory[key].name}:`}
                        </Text>
                        <Text style={styles.modalText}>
                          {`Tienes ${ingredientsInventory[key].toFixed(1)} - ` +
                          `Quedarán ${
                            newIngredientsInventory[key].quantity.toFixed(1)} ${newIngredientsInventory[key].measure}`}
                        </Text>
                      </View>
                    ))}
                </ScrollView>
              </>
            )}
            {Object.keys(alertIngredients).length > 0 &&
            (<>
              <Text style={styles.modalTitle}>
                Ingredientes con falta de inventario
              </Text>
              <Text style={styles.modalSubtitle}>
                Quedarán con inventario 0
              </Text>
              <ScrollView persistentScrollbar={true} fadingEdgeLength={80} style={styles.modalScrollView}>
                {Object.keys(alertIngredients).map((key, i) => (
                  <View key={i.toString()}>
                    <Text
                      style={[styles.modalText, styles.bold]}
                    >
                      {`${key}:`}
                    </Text>
                    <Text style={styles.modalText}>
                      {`Tienes ${ingredientsInventory[alertIngredients[key].id].toFixed(1)} - ` +
                      `Faltan ${alertIngredients[key].quantity.toFixed(1)} ${alertIngredients[key].measure}`}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </>)}
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setConfirmReduceInventoryModal(false)}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setConfirmReduceInventoryModal(false);
                  setConfirmReduceInventory(true);
                }}
              >
                <Text style={[styles.buttonText, styles.confirmButtonText]}>
                  Reducir Inventario
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <TouchableOpacity
          style={styles.inventoryButton}
          onPress={reduceInventorySubmit}
        >
          <Text style={styles.inventoryButtonText}>
            Reducir Inventario
          </Text>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Icon
            name='people'
            color={colors.grayIcon}
            size={23}
          />
          <Text style={styles.value}>
            {`${menu.attributes.portions} ${(menu.attributes.portions === 1 ? 'porción' : 'porciones')}`}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon
            name='attach-money'
            color={colors.grayIcon}
            size={23}
          />
          <Text style={styles.value}>
            {formatMoney(menuPrice, '', '')}
          </Text>
        </View>
        <Text style={styles.title}>
          {'Recetas'}
        </Text>
        {menu.attributes.menuRecipes.data.map((recipe, i) => (
          <View
            key={recipe.id}
            style={styles.recipeRow}
          >
            <View style={(i > 0) ? [styles.recipeContainer, styles.border] : styles.recipeContainer}>
              <View style={styles.left}>
                <Text style={styles.recipeName}>
                  {recipe.attributes.recipe.name}
                </Text>
                <Text style={styles.portions}>
                  {`${recipe.attributes.recipe.portions * recipe.attributes.recipeQuantity} porciones`}
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.price}>
                  {formatMoney(calculateRecipePrice(recipe.attributes.recipe, true) *
                    recipe.attributes.recipeQuantity, '$ ')}
                </Text>
              </View>
            </View>
          </View>
        ))}
        <Text style={styles.title}>
          Lista de compras
        </Text>
        <View style={styles.infoContainer}>
          <TouchableOpacity
            style={styles.shoppingListButton}
            onPress={() => exportShoppingList()}
          ><Text style={styles.shoppingListText}>Exportar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shoppingListButton}
            onPress={() => copyShoppingListToClipboard()}
          ><Text style={styles.shoppingListText}>Copiar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default Menu;
