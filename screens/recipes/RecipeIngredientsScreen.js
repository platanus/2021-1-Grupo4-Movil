import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { View, Text, CheckBox, ActionSheetIOS } from 'react-native';
//import { CheckBox } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import colors from '../../styles/appColors';
import styles from '../../styles/Ingredients/indexStyles';


function RecipeIngredients(props) {
    const { navigation, route } = props;
    const actualSelection = useStoreState((state) => state.ingredients.currentSelected);
    const isNewRecipe = route.params;
    const getAllIngredients = useStoreActions((actions) => actions.getIngredients);
    const setIngredientsForRecipe = useStoreActions((actions) => actions.setSelectedIngredient);
    const [selecteds, setSelecteds] = useState([]);
    const [ingredients, setIngredients] = useState([])

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
      })
        setIngredientsForRecipe(submitIngredients);
        const backRoute = isNewRecipe === null ? 'Crear receta' : 'Editar Receta';
        navigation.navigate(backRoute);
    }

    return (
        <>
          <View style={{ margin: 10 }}>
            {
                ingredients.map((ing, i) => (
                  <View key={i} style={ {
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center', margin: 10 } }>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        padding: '4px', width: '20%' }} key={i}>
                        <CheckBox
                          value={selecteds.includes(i)}
                          onValueChange={() => addIngredientChecked(i)}
                          style={{ flexDirection: 'row', marginRight: '10px' }}
                        />
                        <Text style={styles.name}>
                        {ing.attributes.name}
                        </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', left: '60%' }}>
                        <Text style={styles.price}>
                        {`$${ing.attributes.price / ing.attributes.quantity}/${ing.attributes.measure}`}
                        </Text>
                    </View>
                  </View>
                )
              )
            }
            <TouchableOpacity onPress={saveSelectedIngredients}>
                <Text>
                    Guardar cambios
                </Text>
            </TouchableOpacity>
          </View>
        </>
    )
}

export default RecipeIngredients;
