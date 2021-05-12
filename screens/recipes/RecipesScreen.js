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

  useEffect(() => {
    const auxRows = [];
    for (let i = 0;
      i < recipes.length; // - totalRows < 0) ? i < totalRows : i < recipes.length;
      i++) {
      auxRows.push(
        <TouchableOpacity
          style={styles.recipeRow}
          onPress={() => navigation.navigate('Receta', recipes[i].attributes)}
          key={recipes[i].id}>
          <View style={styles.left}>
            <Text style={styles.name} >{(recipes[i]) ? recipes[i].attributes.name : '---'}</Text>
            <View style={styles.recipeInfo}>
              <Icon name='pie-chart' color={colors.recipeIcon} size='23' />
              <Text style = {styles.subtitle}>
                {recipes[i].attributes.portions} {(recipes[i].attributes.portions === 1 ? 'porción' : 'porciones')}
              </Text>
            </View>
            <View style={styles.recipeInfo}>
              <Icon name='timer' color={colors.recipeIcon} size='23' />
              <Text style = {styles.subtitle}>{recipes[i].attributes.cook_minutes} minutos</Text>
            </View>
          </View>
          <View style={styles.right}>
            <Text style = {styles.price}>$XX.XXX</Text>
          </View>
        </TouchableOpacity>,
      );
    }
    setRows(auxRows);
  }, [recipes]);

  if (recipes.length) {
    return (
      <>
        {rows}
      </>
    );
  }

  return (
    <Text>Aún no tienes recetas.</Text>
  );
}

export default Recipes;

