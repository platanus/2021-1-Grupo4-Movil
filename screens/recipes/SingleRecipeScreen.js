import React, { useState } from 'react';
import { TouchableOpacity, View, Text, ScrollView, Alert } from 'react-native';

import { Icon } from 'react-native-elements';
import { useStoreActions } from 'easy-peasy';
import colors from '../../styles/appColors';
import styles from '../../styles/Recipes/singleRecipe';
import minutesToHoursText from '../../utils/recipes';

function Recipe(props) {
  const { navigation, route } = props;
  const deleteRecipe = useStoreActions((actions) => actions.deleteRecipe);
  const [showMenu, setShowMenu] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Icon name='more-vert'
          size='30'
          style={styles.moreVert}
          onPress={() => setShowMenu(!showMenu)}/>
      ),
    });
  }, [navigation, showMenu]);

  return (
    <ScrollView style={styles.mainContainer}>
      {showMenu &&
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuOption}
          onPress={() => navigation.navigate('Editar Receta', route.params)}>
          <Text style={styles.ingredientText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuOption}
          onPress={() => Alert.alert('¿Estás seguro?', 'Esta acción es irreversible',
            [{ text: 'No', onPress: () => { setShowMenu(false); }, style: 'cancel' },
              { text: 'Si', onPress: () => { deleteRecipe(route.params.id); } }],
          )
          }>
          <Text style={styles.ingredientText}>Eliminar</Text>
        </TouchableOpacity>
      </View>}
      <View style={styles.recipeInfoContainer}>
        <View style={styles.recipeInfoRow}>
          <Icon name='timer' color={colors.recipeIcon} size='30' />
          <Text style={styles.infoText}>
            {minutesToHoursText(route.params.attributes.cook_minutes)}
          </Text>
        </View>
        <View style={styles.recipeInfoRow}>
          <Icon name='pie-chart' color={colors.recipeIcon} size='30' />
          <Text style={styles.infoText}>
            {route.params.attributes.portions} {(route.params.attributes.portions === 1 ? 'porción' : 'porciones')}
          </Text>
        </View>
        <View style={styles.recipeInfoRow}>
          <Icon name='attach-money' color={colors.recipeIcon} size='30' />
          <Text style={styles.infoText}>XX.XXX pesos</Text>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.sectionTitleText}>Ingredientes</Text>
        <View style={styles.ingredientsList}>
          <View style={ styles.ingredientTextBox }>
            <Text style={styles.ingredientText}>Ingrediente</Text>
            <Text style={styles.ingredientText}> XX un.</Text>
          </View>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.sectionTitleText}>Pasos</Text>
        <View style={styles.stepBox}>
          <Text style={styles.stepNumber} >1</Text>
          <Text style={styles.stepText}>Lorem ipsum dolor sit amet consectetur adipiscing elit
          natoque porttitor elementum, praesent nulla convallis vel malesuada maecenas hac a interdum
           porta senectus, pulvinar tellus aliquet quisque class dui aptent hendrerit molestie.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Recipe;
