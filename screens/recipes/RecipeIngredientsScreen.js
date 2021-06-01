import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { View, Text, CheckBox, TextInput, ActionSheetIOS } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../styles/Recipes/ingredientRecipe';


function RecipeIngredients(props) {
    const { navigation, route } = props;
    const actualSelection = useStoreState((state) => state.ingredients.currentSelected);
    const isNewRecipe = route.params;
    const getAllIngredients = useStoreActions((actions) => actions.getIngredients);
    const setIngredientsForRecipe = useStoreActions((actions) => actions.setSelectedIngredient);
    const [selecteds, setSelecteds] = useState([]);
    const [ingredients, setIngredients] = useState([])
    const [currentSearch, setCurrentSearch] = useState('')

    useEffect(() => {
        getAllIngredients()
          .then((resp) => {
            setIngredients(resp);
            const idsAll = resp.map((i) => i.id.toString())
            const idsActual = actualSelection.map((i) => i.id.toString())
            const beforeSelecteds = [] 
            idsActual.forEach((id) => {
              beforeSelecteds.push(idsAll.indexOf(id))
            })
            setSelecteds(beforeSelecteds)
          })
          }, [])

    function getIngredientsFromSearch() {
      if (currentSearch.length === 0) {
        return ingredients
      } else {
        const filter = []
        ingredients.forEach((ing) => {
          const ingredientLowerCase = ing.attributes.name.toLowerCase()
          const currentSearchLowerCase = currentSearch.toLowerCase()
          if (ingredientLowerCase.includes(currentSearchLowerCase)) {
            filter.push(ing)
          }
        })
        return filter
      }
    }

    function addIngredientChecked(i) {
      if (!selecteds.includes(i)) {
        setSelecteds(selecteds.concat(i))
      } else {
        const index = selecteds.indexOf(i)
        selecteds.splice(index, 1)
        setSelecteds([].concat(selecteds))
      }
    }

    function saveSelectedIngredients() {
      const submitIngredients = []
      selecteds.forEach((index) => {
        submitIngredients.push(ingredients[index])
      });
        setIngredientsForRecipe(submitIngredients);
        const backRoute = isNewRecipe === null ? 'Crear receta' : 'Editar Receta';
        navigation.navigate(backRoute);
    }

    const shownIngredients = getIngredientsFromSearch()

    return (
        <View style={styles.container}>
          <View style={styles.recipeSearcherRow}>
            <Text style={styles.label}>Nombre del ingrediente</Text>
            <TextInput
              style={styles.searcherInput}
              value={currentSearch}
              onChangeText={setCurrentSearch}/>
          </View>
          {
              shownIngredients.map((ing, i) => (
                <View key={i} style={styles.ingredientRow}>
                  <View style={styles.ingredientData} key={i}>
                      <CheckBox
                        value={selecteds.includes(i)}
                        onValueChange={() => addIngredientChecked(i)}
                        style={styles.checkbox}
                      />
                      <Text style={styles.name}>
                      {ing.attributes.name}
                      </Text>
                  </View>
                  <View style={styles.ingredientPrice}>
                      <Text style={styles.price}>
                      {`$${ing.attributes.price / ing.attributes.quantity} / ${ing.attributes.measure}`}
                      </Text>
                  </View>
                </View>
              )
            )
          }
          <TouchableOpacity style={styles.submitIngredients} onPress={saveSelectedIngredients}>
              <Text style={styles.saveButton}>
                  Guardar cambios
              </Text>
          </TouchableOpacity>
        </View>
    )
}

export default RecipeIngredients;
