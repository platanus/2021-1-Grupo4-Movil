import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { View, Text, CheckBox, ActionSheetIOS } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import colors from '../../styles/appColors';
import styles from '../../styles/Ingredients/indexStyles';

function RecipeIngredients(props) {
    const { navigation, route } = props;
    const isNewRecipe = route.params;
    const getAllIngredients = useStoreActions((actions) => actions.getIngredients);
    const currentSelected = useStoreState((state) => state.ingredients.currentSelected);
    const [selecteds, setSelecteds] = useState(currentSelected);
    //const setSelectedIngredient = useStoreActions((actions) => actions.setSelectedIngredient);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getAllIngredients()
          .then((resp) => {
            setIngredients(resp);
          });
      }, []);

    function addIngredientChecked(ing) {
        const newSelectedArray = [...selecteds, ing];
        setSelecteds(newSelectedArray);
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
                          value={selecteds.map((selec) => selec.id).includes(ing.id)}
                          onValueChange={() => addIngredientChecked(ing)}
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
          </View>
        </>
    )
}

export default RecipeIngredients;
