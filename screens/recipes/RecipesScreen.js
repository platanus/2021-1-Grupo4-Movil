/* eslint-disable no-unused-vars */
/* eslint-disable max-statements */

import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Icon } from 'react-native-elements';
import colors from '../../styles/appColors';
import RecipeRow from '../../components/recipeRow';
import styles from '../../styles/Recipes';

function Recipes(props) {
  const { navigation } = props;
  const getRecipes = useStoreActions((actions) => actions.getRecipes);
  const [recipes, setRecipes] = useState([]);
  const [showError, setShowError] = useState(false);
  // const [newRecipe, setNewRecipe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  // const deletedRecipe = useStoreState((state) => state.recipes.delete);
  // const loadRecipes = useStoreState((state) => state.recipes.load);
  // const setLoadRecipes = useStoreActions((actions) => actions.setLoadRecipes);

  useEffect(() => {
    getRecipes()
      .then((res) => {
        setRecipes(res);
      })
      .catch((err) => {
        setShowError(true);
        setErrorMessage(err);
      })
      .finally(() => {
        setMounted(true);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
    // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Icon
          name='add'
          size={30}
          color={colors.kitchengramWhite}
          style={{ paddingRight: 10 }}
          onPress={() => navigation.navigate('Crear receta', {
            recipes,
            setRecipes,
          })}/>
      ),
    });
  }, [navigation, recipes]);

  if (mounted && recipes.length) {
    return (
      <ScrollView>
        {recipes.map((recipe) => (
          <RecipeRow
            key={recipe.id}
            recipe={recipe}
            navigation={navigation}
            recipes={recipes}
            setRecipes={setRecipes}
          />
        ))}
      </ScrollView>
    );
  }

  if (mounted) {
    return (
      <Text style={styles.emptyIndex}>
        Aún no tienes recetas.
      </Text>
    );
  }

  return (
    <>
    </>
  );
}

export default Recipes;
