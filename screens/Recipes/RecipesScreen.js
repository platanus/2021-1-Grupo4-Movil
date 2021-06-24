import React, { useEffect, useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { useStoreActions } from 'easy-peasy';
import { Icon } from 'react-native-elements';
import colors from '../../styles/appColors';
import RecipeRow from '../../components/recipeRow';
import styles from '../../styles/Recipes';

function Recipes(props) {
  const { navigation } = props;
  const getRecipes = useStoreActions((actions) => actions.getRecipes);
  const [recipes, setRecipes] = useState([]);
  const [_showError, setShowError] = useState(false);
  const [_errorMessage, setErrorMessage] = useState('');
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
