import React, { useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';

import colors from '../../styles/appColors';
import styles from '../../styles/Menus/showStyles';
import formatMoney from '../../utils/formatMoney';

function Menu(props) {
  const {
    navigation,
    route,
  } = props;

  const { menu } = route.params;

  useEffect(() => {
    console.log('Inside menu', menu);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: menu.attributes.name,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.infoContainer}>
          <Icon
            name='people'
            color={colors.grayIcon}
            size={23}
          />
          <Text style={styles.value}>
            {`${menu.attributes.portions} porciones`}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon
            name='attach-money'
            color={colors.grayIcon}
            size={23}
          />
          <Text style={styles.value}>
            {formatMoney(10500, '', '')}
          </Text>
        </View>
        <Text style={styles.title}>
          {'Recetas'}
        </Text>
        {menu.attributes.menu_recipes.data.map((recipe, i) => (
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
                  {`${recipe.attributes.recipe.portions} porciones`}
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.price}>
                  {formatMoney(10500, '$ ', '')}
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
