import React, {
  useEffect,
  useState,
} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
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

  useEffect(() => {
    getIngredients()
      .then((res) => {
        setIngredients(res);
      })
      .catch(() => {
      });
  }, [getIngredients]);

  React.useLayoutEffect(() => {
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
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default IndexIngredients;
