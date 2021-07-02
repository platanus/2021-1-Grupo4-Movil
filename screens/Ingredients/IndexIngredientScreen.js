/* eslint-disable max-statements */
import React, {
  useEffect,
  useState,
} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
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
  const [ingredients, setIngredients] = useState([]);
  const evenNumber = 2;
  const [mounted, setMounted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getIngredients()
      .then((res) => {
        setIngredients(res);
        setMounted(true);
      })
      .catch(() => {
      });
  }, [getIngredients]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
    // eslint-disable-next-line react/display-name
      headerRight: () => (
        <View style={styles.row}>
          <Icon name='list'
            size={30}
            color={colors.kitchengramWhite}
            style={{ paddingRight: 20 }}
            onPress={() => navigation.navigate('Inventario Ingrediente', {
              ingredients,
              setIngredients,
            })}/>
          <Icon name='add'
            size={30}
            color={colors.kitchengramWhite}
            style={{ paddingRight: 10 }}
            onPress={() => navigation.navigate('Nuevo Ingrediente', {
              isNew: true,
              ingredients,
              setIngredients,
            })}/>
        </View>
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
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (mounted) && (
    <Text style={styles.emptyMessage}>
      Aún no tienes ingredientes.
    </Text>
  );
}

export default IndexIngredients;
