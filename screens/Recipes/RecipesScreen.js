/* eslint-disable max-statements */
/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState,
} from 'react';
import {
  Modal,
  View, 
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Icon } from 'react-native-elements';
import colors from '../../styles/appColors';
// import { styles } from '../../styles/Recipes/index';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  left: {
    width: '60%',
    height: '100%',
    paddingLeft: '5%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  right: {
    width: '40%',
    height: '100%',
    paddingRight: '5%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  name: {
    fontSize: 17,
    color: '#111111',
    fontFamily: 'monospace',
    fontWeight: 'normal',
    fontStyle: 'normal',
    paddingBottom: '5%',
  },
  recipeRow: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  even: {
    backgroundColor: '#EEEEEE',
  },
  price: {
    fontSize: 20,
    color: '#BC31EA',
    fontFamily: 'monospace',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  subtitle: {
    fontSize: 15,
    color: '#767676',
    fontFamily: 'monospace',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  recipeInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

function Recipes() {
  const currentUser = useStoreState((state) => state.currentUser);
  const getRecipes = useStoreActions((actions) => actions.getRecipes);
  const [recipes, setRecipes] = useState([]);
  const [showError, setShowError] = useState(false);
  const [newRecipe, setNewRecipe] = useState(false);
  const [rows, setRows] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  function callRecipesApi() {
    getRecipes()
      .then((res) => {
        setRecipes(res);
      })
      .catch((err) => {
        setShowError(true);
        setErrorMessage(err);
      });
  }

  useEffect(() => {
    callRecipesApi();
  }, [newRecipe]);

  if (recipes.length) {
    return (
      <>
        <TouchableOpacity style={[styles.recipeRow, styles.even]}>
          <View style={styles.left}>
            <Text style={styles.name} >{recipes[0].attributes.name}</Text>
            <View style={styles.recipeInfo}>
              <Icon name='pie-chart' color={colors.recipeIcon} size='23' />
              <Text style = {styles.subtitle}>
                {recipes[0].attributes.portions} {(recipes[0].attributes.portions === '1' ? 'porciones' : 'porción')}
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
    <Text>Recetas</Text>
  );
}

export default Recipes;

// useEffect(() => {
//   const auxRows = [];
//   const totalRows = 9;
//   const evenNumber = 2;
//   for (let i = 0;
//     (recipes.length - totalRows < 0) ? i < totalRows : i < recipes.length;
//     i++) {
//     auxRows.push(
//       <TouchableOpacity
//         style={[styles.ingredientRow, (i % evenNumber === 0) ? styles.even : styles.odd]}
//         key={recipes[i] ? recipes[i].id : 100 + i}
//       >
//         <View style={styles.left}>
//           <Text style={styles.name}>
//             {(recipes[i]) ? recipes[i].attributes.name : '---'}
//           </Text>
//           <Text style={styles.measure}>
//             {(recipes[i]) ? `${recipes[i].attributes.quantity} ${recipes[i].attributes.measure}` : '---'}
//           </Text>
//         </View>
//         <View style={styles.right}>
//           <Text style={styles.price}>
//             {(recipes[i]) ? `$${recipes[i].attributes.price}` : '----'}
//           </Text>
//         </View>
//       </TouchableOpacity>,
//     );
//     setRows(auxRows);
//   }
// }, [recipes]);
