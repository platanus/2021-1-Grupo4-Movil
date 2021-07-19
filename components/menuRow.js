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
    menu.attributes.menuRecipes.data.forEach((recipe) => {
      price += calculateRecipePrice(recipe.attributes.recipe, true) * recipe.attributes.recipeQuantity;
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
    >
      <View style={styles.left}>
        <Text style={styles.name}>
          {menu.attributes.name}
        </Text>
        <View style={styles.menuInfo}>
          <Icon
            name='people'
            color={colors.kitchengramGray400}
            size={18}
          />
          <Text style={styles.subtitle}>
            {`${menu.attributes.portions} ${(menu.attributes.portions === 1 ? 'porción' : 'porciones')}`}
          </Text>
        </View>
        <View style={styles.menuInfo}>
          <Icon
            name='restaurant-menu'
            color={colors.kitchengramGray400}
            size={18}
          />
          <Text style={styles.subtitle}>
            {`${menu.attributes.menuRecipes.data.length} ${(menu.attributes.menuRecipes.data.length === 1 ?
              'receta' : 'recetas')}`}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>
          {formatMoney(menuPrice, '$ ')}
        </Text>
        <Icon name='chevron-right' color={colors.kitchengramGray400} size={20} />
      </View>
    </TouchableOpacity>
  );
}

export default MenuRow;
