import React, { useState } from 'react';
import { TouchableOpacity, View, Text, ScrollView, Alert } from 'react-native';

import { Icon } from 'react-native-elements';
import colors from '../../styles/appColors';
import styles from '../../styles/Recipes/singleRecipe';

function Recipe(props) {
  const { navigation, route } = props;
  const [showMenu, setShowMenu] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon name='more-vert'
          size='30'
          style={{ paddingRight: 8, color: colors.recipeIcon }}
          onPress={() => setShowMenu(!showMenu)}/>
      ),
    });
  }, [navigation, showMenu]);

  return (
    <ScrollView style={styles.mainContainer}>
      {showMenu &&
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuOption}
          onPress={() => navigation.navigate('Editar Receta', route.params.attributes)}>
          <Text style={styles.ingredientText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuOption}
          onPress={() => Alert.alert('¿Estás seguro?', 'Esta acción es irreversible',
            [{ text: 'No', onPress: () => { setShowMenu(false); }, style: 'cancel' },
              { text: 'Si', onPress: () => {} }],
          )
          }>
          <Text style={styles.ingredientText}>Eliminar</Text>
        </TouchableOpacity>
      </View>}
      <View style={styles.recipeInfoContainer}>
        <View style={styles.recipeInfoRow}>
          <Icon name='timer' color={colors.recipeIcon} size='30' />
          <Text style={styles.infoText}>
            {route.params.attributes.cook_minutes} {(route.params.attributes.portions === 1 ? 'minuto' : 'minutos')}
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
