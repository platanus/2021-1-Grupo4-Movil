/* eslint-disable no-unused-vars */
/* eslint-disable max-statements */

import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { camelizeKeys } from 'humps';
import { Icon } from 'react-native-elements';
import colors from '../../styles/appColors';
import RecipeRow from '../../components/recipeRow';
import styles from '../../styles/Recipes/index';

function Recipes(props) {
  const { navigation } = props;
  const getRecipes = useStoreActions((actions) => actions.getRecipes);
  const [recipes, setRecipes] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [mounted, setMounted] = useState(false);

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
      <ScrollView style={styles.scroll}>
        {recipes.map((recipe) => (
          <RecipeRow
            key={recipe.id}
            recipe={camelizeKeys(recipe)}
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
      <Text style={styles.emptyMessage}>
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
