import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../styles/appColors';
import styles from '../styles/Menus/indexStyles';
import calculateRecipePrice from '../utils/calculateRecipePrice';
import formatMoney from '../utils/formatMoney';

function MenuRow(props) {
  const {
    navigation,
    menu,
    menus,
  } = props;

  const [menuPrice, setMenuPrice] = useState(0);

  useEffect(() => {
    let price = 0;
    menu.attributes.menu_recipes.data.forEach((recipe) => {
      price += calculateRecipePrice(recipe.attributes.recipe, true) * recipe.attributes.recipe_quantity;
    });
    setMenuPrice(price);
  }, [menu]);

  return (
    <TouchableOpacity
      style={styles.menuRow}
      onPress={() => navigation.navigate('Menu', {
        menu,
        menus,
        menuPrice,
      })}
      key={menu.id}
    >
      <View style={styles.left}>
        <Text style={styles.name}>
          {menu.attributes.name}
        </Text>
        <View style={styles.menuInfo}>
          <Icon
            name='people'
            color={colors.grayIcon}
            size={23}
          />
          <Text style={styles.subtitle}>
            {`${menu.attributes.portions} porciones`}
          </Text>
        </View>
        <View style={styles.menuInfo}>
          <Icon
            name='restaurant-menu'
            color={colors.grayIcon}
            size={23}
          />
          <Text style={styles.subtitle}>
            {`${menu.attributes.menu_recipes.data.length} recetas`}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>
          {formatMoney(menuPrice, '$ ', '')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default MenuRow;
