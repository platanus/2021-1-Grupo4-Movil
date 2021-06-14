/* eslint-disable no-unused-vars */
/* eslint-disable max-statements */

import React, { useEffect, useState } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Icon } from 'react-native-elements';
import colors from '../../styles/appColors';
import RecipeRow from '../../components/recipeRow';
import styles from '../../styles/Recipes/index';

function Recipes(props) {
  const { navigation } = props;
  const getRecipes = useStoreActions((actions) => actions.getRecipes);
  const [recipes, setRecipes] = useState([]);
  const [showError, setShowError] = useState(false);
  const [newRecipe, setNewRecipe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const deletedRecipe = useStoreState((state) => state.recipes.delete);
  const [mounted, setMounted] = useState(false);
  const loadRecipes = useStoreState((state) => state.recipes.load);
  const setLoadRecipes = useStoreActions((actions) => actions.setLoadRecipes);

  useEffect(() => {
    if (loadRecipes) {
      getRecipes()
        .then((res) => {
          setRecipes(res);
          setMounted(true);
        })
        .catch((err) => {
          setShowError(true);
          setErrorMessage(err);
        })
        .finally(() => {
          setLoadRecipes(false);
        });
    }
  }, [loadRecipes, getRecipes, setLoadRecipes]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
    // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Icon name='add'
          size={30}
          color={colors.kitchengramWhite}
          style={{ paddingRight: 10 }}
          onPress={() => navigation.navigate('Crear receta')}/>
      ),
    });
  }, [navigation]);

  if (recipes.length) {
    return (
      <ScrollView>
        {recipes.map((recipe) => (
          <RecipeRow key={recipe.id} recipe={recipe} navigation={navigation}/>
        ))}
      </ScrollView>
    );
  }

  return mounted && (
    <Text style={styles.emptyMessage}>
      Aún no tienes recetas.
    </Text>
  );
}

export default Recipes;
