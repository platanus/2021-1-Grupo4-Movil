import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStoreActions } from 'easy-peasy';
import styles from '../../styles/Recipes/newRecipe';
import colors from '../../styles/appColors';
import RecipeSteps from './recipeStepsScreen';

/* eslint max-statements: [2, 20] */
function EditRecipe({ navigation, route }) {
  const recipe = route ? route.params : null;
  const [recipeName, setRecipeName] = useState(recipe ? recipe.attributes.name : '');
  const [recipePortions, setRecipePortions] = useState(recipe ? recipe.attributes.portions : '');
  const [recipeTime, setRecipeTime] = useState(recipe ? recipe.attributes.cook_minutes : '');
  const [recipeSteps, setRecipeSteps] = useState(recipe ? recipe.attributes.steps.data : []);
  const editRecipe = useStoreActions((actions) => actions.editRecipe);
  const createRecipe = useStoreActions((actions) => actions.createRecipe);
  const createRecipeStep = useStoreActions((actions) => actions.createRecipeStep);
  const editRecipeStep = useStoreActions((actions) => actions.editRecipeStep);
  const deleteRecipeStep = useStoreActions((actions) => actions.deleteRecipeStep);

  function stepsActions(recipeId) {
    for (let i = 0; i < recipeSteps.length; i++) {
      if (('new' in recipeSteps[i]) && !('delete' in recipeSteps[i])) {
        createRecipeStep({
          id: recipeId,
          body: recipeSteps[i].attributes,
        });
      } else if (('delete' in recipeSteps[i]) && !('new' in recipeSteps[i])) {
        deleteRecipeStep({
          recipeId,
          stepId: recipeSteps[i].id,
        });
      } else if (('edit' in recipeSteps[i]) && !('delete' in recipeSteps[i]) && !('new' in recipeSteps[i])) {
        editRecipeStep({
          recipeId,
          stepId: recipeSteps[i].id,
          body: recipeSteps[i].attributes,
        });
      }
    }

    return;
  }

  function handleSubmit() {
    const body = {
      name: recipeName,
      portions: recipePortions,
      // eslint-disable-next-line
      cook_minutes: recipeTime,
    };

    if (recipe) {
      stepsActions(recipe.id);
      editRecipe({ body, id: recipe.id })
        .then(() => {
          navigation.navigate('Recetas', { recipe });
        })
        .catch(() => {
        });
    } else {
      createRecipe(body)
        .then((resp) => {
          stepsActions(resp.data.data.id);
          console.log('yapooo funciona');
          console.log(resp.data);

          return resp.data.data;
        })
        .then((resp) => {
          console.log('whyyy');
          console.log(resp);
          navigation.navigate('Recetas', { recipe: resp });
        })
        .catch(() => {
        });
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

export default EditRecipe;

/* <View style={styles.ingredientsContainer}>
  <View style={styles.ingredientsList}>
    <View style={ styles.ingredientTextBox }>
      <View style={styles.sectionQuantity}>
        <TextInput style={styles.sectionQuantityInput} placeholder=' @@ '/>
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
  </View> */
