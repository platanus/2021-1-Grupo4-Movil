import { useStoreActions } from 'easy-peasy';
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../styles/appColors';
import styles from '../../styles/Recipes/newRecipe';

function newRecipe(props) {
  const { navigation } = props;
  const [recipeName, setRecipeName] = useState('');
  const [recipeTime, setRecipeTime] = useState('');
  const [recipePortions, setRecipePortions] = useState('');
  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState('');
  const createRecipe = useStoreActions((actions) => actions.createRecipe);

  function addStep() {
    const newStepsArray = steps.concat(newStep);
    setSteps(newStepsArray);
    setNewStep('');
  }

  async function submitNewRecipe() {
    const body = {
      recipe: {
        name: recipeName,
        portions: parseInt(recipePortions),
        instructions: 'lorem ipsum',
        cook_minutes: parseInt(recipeTime),
      },
    };
    await createRecipe(body);
    navigation.navigate('Recetas');
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.sectionTitleText}>Datos básicos</Text>
        <View style={styles.recipeInfoRow}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.sectionNameInput}
            value={recipeName}
            onChangeText={setRecipeName}/>
        </View>
        <View style={styles.inlineInputs}>
          <View style={styles.recipeInfoRow}>
            <Text style={styles.label}>Porciones</Text>
            <TextInput
              style={styles.sectionTextInput}
              value={recipePortions}
              onChangeText={setRecipePortions}/>
          </View>
          <View style={styles.recipeInfoRow}>
            <Text style={styles.label}>Tiempo de preparación</Text>
            <TextInput
              style={styles.sectionTextInput}
              value={recipeTime}
              onChangeText={setRecipeTime}/>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.inlineInputs}>
          <View style={styles.recipeInfoRow}>
            <Text style={styles.sectionTitleText}>Ingredientes seleccionados</Text>
          </View>
          <View style={styles.recipeInfoRow}>
            <TouchableOpacity style={styles.ingredientButton} onPress={ () => alert('Buscar ingredientes!') }>
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
              <Text style={styles.ingredientText}>$ XX.XX</Text>
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
        {steps.map((step, index) => (<View style={styles.stepBox} key={index}>
          <Text style={styles.stepNumber}>{index + 1}</Text>
          <Text style={styles.stepText}>{step}</Text>
        </View>))}
        <TextInput
          style={ styles.newStepText }
          placeholder="Nuevo paso"
          value={newStep}
          onChangeText={setNewStep}
        />
        <View style={ styles.sectionNewStep }>
          <TouchableOpacity style={styles.stepButton} onPress={addStep}>
            <Text>Agregar paso</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.submitNewRecipe} onPress={submitNewRecipe}>
          <Text style={styles.newRecipeButtonText}>Crear receta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default newRecipe;
