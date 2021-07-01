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
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useStoreActions } from 'easy-peasy';

import colors from '../../styles/appColors';
import styles from '../../styles/Menus/showStyles';

import calculateRecipePrice from '../../utils/calculateRecipePrice';
import formatMoney from '../../utils/formatMoney';
import createExcel from '../../utils/excelMaker';

import ShowMenuOptions from '../../components/ShowMenuOptions';

function Menu(props) {
  const {
    navigation,
    route,
  } = props;

  const deleteMenu = useStoreActions((actions) => actions.deleteMenu);
  const setGlobalMenus = useStoreActions((actions) => actions.setMenus);
  const getShoppingList = useStoreActions((actions) => actions.getShoppingList);

  const {
    menu,
    menuPrice,
    menus,
  } = route.params;

  const [showMenuOptions, setShowMenuOptions] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Icon
          name='more-vert'
          size={30}
          style={styles.navIcon}
          onPress={() => setShowMenuOptions(!showMenuOptions)}/>
      ),
      headerTitle: menu.attributes.name,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportShoppingList = () => {
    getShoppingList({ id: menu.id })
      .then((res) => {
        createExcel(res);
      })
      .catch((err) => alert(err))
  };

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
      <ScrollView>
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
        <TouchableOpacity
          style={styles.shoppingListButton}
          onPress={() => exportShoppingList()}
        ><Text style={styles.shoppingListText}>Exportar lista de compras</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default Menu;
