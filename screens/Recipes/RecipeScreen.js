import React, {
} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../styles/appColors';
import styles from '../../styles/Recipes/singleRecipe';

function Recipe(props) {
  const { route } = props;

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.recipeInfoContainer}>
        <View style={styles.recipeInfoRow}>
          <Icon name='timer' color={colors.recipeIcon} size='30' />
          <Text style={styles.infoText}>
            {route.params.cook_minutes} {(route.params.portions === 1 ? 'minuto' : 'minutos')}
          </Text>
        </View>
        <View style={styles.recipeInfoRow}>
          <Icon name='pie-chart' color={colors.recipeIcon} size='30' />
          <Text style={styles.infoText}>
            {route.params.portions} {(route.params.portions === 1 ? 'porción' : 'porciones')}
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
