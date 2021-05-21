import { useStoreActions } from 'easy-peasy';
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../styles/appColors';
import styles from '../../styles/Recipes/newRecipe';
import RecipeSteps from './RecipeStepsScreen';

/* eslint max-statements: [2, 20] */
function FormRecipe(props) {
  const { navigation, route } = props;
  const recipe = route ? route.params : null;

  const [recipeName, setRecipeName] = useState(recipe ? recipe.attributes.name : '');
  const [recipeTime, setRecipeTime] = useState(recipe ? recipe.attributes.cook_minutes.toString() : '');
  const [recipePortions, setRecipePortions] = useState(recipe ? recipe.attributes.portions.toString() : '');
  const [recipeSteps, setRecipeSteps] = useState(recipe ? recipe.attributes.steps.data : []);

  const createRecipe = useStoreActions((actions) => actions.createRecipe);
  const editRecipe = useStoreActions((actions) => actions.editRecipe);
  const createRecipeStep = useStoreActions((actions) => actions.createRecipeStep);
  const editRecipeStep = useStoreActions((actions) => actions.editRecipeStep);
  const deleteRecipeStep = useStoreActions((actions) => actions.deleteRecipeStep);

  function stepAction(recipeStep, recipeId) {
    if (('new' in recipeStep) && !('delete' in recipeStep)) {
      return createRecipeStep({
        id: recipeId,
        body: recipeStep.attributes,
      });
    } else if (('delete' in recipeStep) && !('new' in recipeStep)) {
      return deleteRecipeStep({
        recipeId,
        stepId: recipeStep.id,
      });
    } else if (('edit' in recipeStep) && !('delete' in recipeStep) && !('new' in recipeStep)) {
      return editRecipeStep({
        recipeId,
        stepId: recipeStep.id,
        body: recipeStep.attributes,
      });
    }

    return null;
  }

  function stepsActions(recipeId) {
    const promises = [];
    for (let i = 0; i < recipeSteps.length; i++) {
      promises.push(stepAction(recipeSteps[i], recipeId));
    }

    return promises;
  }

  function handleSubmit() {
    const body = {
      name: recipeName,
      portions: parseInt(recipePortions, 10),
      // eslint-disable-next-line
      cook_minutes: parseInt(recipeTime, 10),
    };

    if (recipe) {
      editRecipe({ body, id: recipe.id })
        .then(() => Promise.all(stepsActions(recipe.id)))
        .then(() => {
          navigation.navigate('Recetas', { recipe });
        })
        .catch(() => {
        });
    } else {
      createRecipe(body)
        .then((resp) => Promise.all(stepsActions(resp.data.data.id)))
        .then(() => {
          navigation.navigate('Recetas', { recipe });
        })
        .catch(() => {});
    }
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
            <TouchableOpacity style={styles.ingredientButton} onPress={ () => Alert.alert('Buscar ingredientes!') }>
              <Text>Buscar ingredientes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
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
      <RecipeSteps
        recipeSteps={recipeSteps}
        setRecipeSteps={setRecipeSteps}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.submitNewRecipe} onPress={handleSubmit}>
          <Text style={styles.newRecipeButtonText}>{recipe ? 'Editar receta' : 'Crear receta'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default FormRecipe;
