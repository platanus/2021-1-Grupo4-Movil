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
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
  useStoreActions,
  useStoreState,
} from 'easy-peasy';

import colors from '../../styles/appColors';
import styles from '../../styles/Menus/showStyles';

import calculateRecipePrice from '../../utils/calculateRecipePrice';
import formatMoney from '../../utils/formatMoney';

import ShowMenuOptions from '../../components/ShowMenuOptions';

function Menu(props) {
  const {
    navigation,
    route,
  } = props;

  const deleteMenu = useStoreActions((actions) => actions.deleteMenu);
  const setGlobalMenus = useStoreActions((actions) => actions.setMenus);
  const setIngredientsInventory = useStoreActions((actions) => actions.setIngredientsInventory);
  const updateInventory = useStoreActions((actions) => actions.updateInventory);
  const ingredientsInventory = useStoreState((state) => state.ingredientsInventory);

  const {
    menu,
    menuPrice,
    menus,
  } = route.params;

  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const [alertIngredients, setAlertIngredients] = useState({});
  const [newIngredientsInventory, setNewIngredientsInventory] = useState({});
  const [confirmReduceInventory, setConfirmReduceInventory] = useState(false);
  const [reduceInventorySuccessful, setReduceInventorySuccessful] = useState(false);

  useEffect(() => {
    if (confirmReduceInventory) {
      const ingredientsInventoryCopy = { ...ingredientsInventory };
      const payload = [];
      Object.keys(newIngredientsInventory).forEach((id) => {
        payload.push({
          ingredientId: id,
          inventory: newIngredientsInventory[id] < 0 ? 0 : newIngredientsInventory[id],
        });
        ingredientsInventoryCopy[id] = newIngredientsInventory[id] < 0 ? 0 : newIngredientsInventory[id];
      });
      updateInventory({ ingredients: payload })
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reduceInventory() {
    const newIngredientsInventoryCopy = {};
    const alertIngredientsCopy = {};
    menu.attributes.menuRecipes.data.forEach((recipe) => {
      recipe.attributes.recipe.recipeIngredients.data.forEach((ingredient) => {
        const id = ingredient.attributes.ingredient.id.toString();
        let newInventory = 0;
        if (Object.keys(newIngredientsInventoryCopy).includes(id)) {
          newInventory = newIngredientsInventoryCopy[id] - ingredient.attributes.ingredientQuantity;
        } else {
          newInventory = ingredientsInventory[id] - ingredient.attributes.ingredientQuantity;
        }
        newIngredientsInventoryCopy[id] = newInventory;
        if (newInventory < 0) {
          alertIngredientsCopy[ingredient.attributes.ingredient.name] = {
            quantity: Math.abs(newInventory),
            measure: ingredient.attributes.ingredient.measure,
          };
        }
      });
    });
    setNewIngredientsInventory(newIngredientsInventoryCopy);
    if (alertIngredientsCopy) {
      setAlertIngredients(alertIngredientsCopy);
    } else {
      setConfirmReduceInventory(true);
    }
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
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              Reducción de inventario exitosa
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setReduceInventorySuccessful(false)}
            >
              <Text style={styles.textStyle}>
                Aceptar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={Object.keys(alertIngredients).length > 0}
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                Ingredientes con falta de inventario
              </Text>
              {Object.keys(alertIngredients).map((key, i) => (
                <Text
                  key={i.toString()}
                  style={styles.modalText}
                >
                  {`${key}: ${alertIngredients[key].quantity} ${alertIngredients[key].measure}`}
                </Text>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setAlertIngredients({});
                setConfirmReduceInventory(true);
              }}
            >
              <Text style={styles.textStyle}>
                Aceptar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <TouchableOpacity
          style={styles.inventoryButton}
          onPress={reduceInventory}
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
                  {`${recipe.attributes.recipe.portions * recipe.attributes.recipe_quantity} porciones`}
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.price}>
                  {formatMoney(calculateRecipePrice(recipe.attributes.recipe, true) *
                    recipe.attributes.recipe_quantity, '$ ')}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default Menu;
