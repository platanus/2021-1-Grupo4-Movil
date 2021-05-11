/* eslint-disable max-statements */

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStoreActions } from 'easy-peasy';
import { Icon } from 'react-native-elements';
import colors from '../../styles/appColors';
import styles from '../../styles/Recipes/index';

function Recipes(props) {
  const { navigation } = props;
  const getRecipes = useStoreActions((actions) => actions.getRecipes);
  const [recipes, setRecipes] = useState([]);
  const [showError, setShowError] = useState(false);
  const [newRecipe, setNewRecipe] = useState(false);
  const [rows, setRows] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getRecipes()
      .then((res) => {
        setRecipes(res);
      })
      .catch((err) => {
        setShowError(true);
        setErrorMessage(err);
      });
  }, [newRecipe]);

  if (recipes.length) {
    return (
      <>
        <TouchableOpacity
          style={[styles.recipeRow, styles.even]}
          onPress={() => navigation.navigate('Receta', recipes[0].attributes)}>
          <View style={styles.left}>
            <Text style={styles.name} >{recipes[0].attributes.name}</Text>
            <View style={styles.recipeInfo}>
              <Icon name='pie-chart' color={colors.recipeIcon} size='23' />
              <Text style = {styles.subtitle}>
                {recipes[0].attributes.portions} {(recipes[0].attributes.portions === 1 ? 'porción' : 'porciones')}
              </Text>
            </View>
            <View style={styles.recipeInfo}>
              <Icon name='timer' color={colors.recipeIcon} size='23' />
              <Text style = {styles.subtitle}>{recipes[0].attributes.cook_minutes} minutos</Text>
            </View>
          </View>
          <View style={styles.right}>
            <Text style = {styles.price}>$XX.XXX</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <Text>Aún no tienes recetas.</Text>
  );
}

export default Recipes;
