/* eslint-disable no-unused-vars */
/* eslint-disable max-statements */

import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import RecipeRow from '../../components/recipeRow';

function Recipes(props) {
  const { navigation } = props;
  const getRecipes = useStoreActions((actions) => actions.getRecipes);
  const [recipes, setRecipes] = useState([]);
  const [showError, setShowError] = useState(false);
  const [newRecipe, setNewRecipe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const deletedRecipe = useStoreState((state) => state.recipes.delete);

  useEffect(() => {
    getRecipes()
      .then((res) => {
        setRecipes(res);
      })
      .catch((err) => {
        setShowError(true);
        setErrorMessage(err);
      });
  }, [newRecipe, getRecipes, deletedRecipe]);

  if (recipes.length) {
    return (recipes.map((recipe) => (
      <RecipeRow key={recipe.id} recipe={recipe} navigation={navigation}/>
    )));
  }

  return (
    <Text>Aún no tienes recetas.</Text>
  );
}

export default Recipes;
