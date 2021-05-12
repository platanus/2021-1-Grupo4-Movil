import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../styles/appColors';
import styles from '../../styles/Recipes/newRecipe';

function newRecipe(props) {
  const { navigation } = props;
  const [showMenu, setShowMenu] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon name='more-vert' size='30' style={{ paddingRight: 8, color: colors.recipeIcon }} onPress={() => alert('This is a button!')}/>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.sectionTitleText}>Datos básicos</Text>
        <View style={styles.recipeInfoRow}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.sectionNameInput}/>
        </View>
        <View style={styles.inlineInputs}>
          <View style={styles.recipeInfoRow}>
            <Text style={styles.label}>Porciones</Text>
            <TextInput style={styles.sectionTextInput}/>
          </View>
          <View style={styles.recipeInfoRow}>
            <Text style={styles.label}>Tiempo de preparación</Text>
            <TextInput style={styles.sectionTextInput}/>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.inlineInputs}>
          <View style={styles.recipeInfoRow}>
            <Text style={styles.sectionTitleText}>Ingredientes seleccionados</Text>
          </View>
          <View style={styles.recipeInfoRow}>
            <TouchableOpacity style={styles.ingredientButton}>
              <Text>Buscar ingredientes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.ingredientsList}>
          <View style={ styles.ingredientTextBox }>
            <View style={styles.sectionQuantity}>
              <TextInput style={styles.sectionQuantityInput}/>
              <Text style={styles.ingredientText}>g.</Text>
              <Text style={styles.ingredientText}> Ingrediente</Text>
            </View>
            <View style={styles.sectionPrice}>
              <Text style={styles.ingredientText}>$XX.XX</Text>
            </View>
          </View>
        </View>
        <View style={ styles.ingredientTextBox }>
          <View style={styles.sectionQuantity}>
            <Text>Costo total</Text>
          </View>
          <View style={styles.sectionPrice}>
            <Text style={ { ...styles.ingredientText, color: colors.purplePrice } }>$XX.XX</Text>
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
        <View style={styles.stepBox}>
          <Text style={styles.stepNumber} >2</Text>
          <Text style={styles.stepText}>Lorem ipsum de class dui aptent hendrerit molestie.</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepNumber} >3</Text>
          <Text style={styles.stepText}>or elementum, praesi aptent hendrerit molestie.</Text>
        </View>
        <TextInput style={ styles.newStepText } placeholder="Nuevo paso"/>
        <View style={ styles.sectionNewStep }>
          <TouchableOpacity style={styles.stepButton}>
            <Text>Agregar paso</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default newRecipe;