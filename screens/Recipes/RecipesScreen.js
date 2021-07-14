/* eslint-disable max-statements */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, ScrollView, RefreshControl } from 'react-native';
import {
  useStoreActions,
  useStoreState,
} from 'easy-peasy';
import Icon from 'react-native-vector-icons/Ionicons';
import RecipeRow from '../../components/recipeRow';
import styles from '../../styles/Recipes/indexStyles';

function Recipes(props) {
  const { navigation } = props;
  const getRecipes = useStoreActions((actions) => actions.getRecipes);
  const setChargeMenus = useStoreActions((actions) => actions.setChargeMenus);
  const setChargeRecipes = useStoreActions((actions) => actions.setChargeRecipes);
  const chargeRecipes = useStoreState((state) => state.chargeRecipes);
  const [recipes, setRecipes] = useState([]);
  const [, setShowError] = useState(false);
  const [, setErrorMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    setRefreshing(true);
    getRecipes()
      .then((res) => {
        setRecipes(res);
      });
    setRefreshing(false);
  }

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

  useEffect(() => {
    setChargeMenus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);

  useEffect(() => {
    if (chargeRecipes) {
      getRecipes()
        .then((res) => {
          setChargeRecipes();
          setRecipes(res);
        })
        .catch((err) => {
          setShowError(true);
          setErrorMessage(err);
        })
        .finally(() => {
          setMounted(true);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chargeRecipes]);

  useLayoutEffect(() => {
    navigation.setOptions({
    // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Icon name='add'
          size={30}
          style={styles.navIcon}
          onPress={() => navigation.navigate('Crear receta', {
            recipes,
            setRecipes,
          })}/>
      ),
    });
  }, [navigation, recipes]);

  if (mounted && recipes.length) {
    return (
      <ScrollView style={styles.scroll} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
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
      <ScrollView style={styles.scroll} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <Text style={styles.emptyMessage}>
          Aún no tienes recetas.
        </Text>
      </ScrollView>
    );
  }

  return (
    <>
    </>
  );
}

export default Recipes;
