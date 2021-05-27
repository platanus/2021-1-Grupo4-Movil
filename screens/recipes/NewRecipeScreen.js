import { useStoreActions } from 'easy-peasy';
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../styles/appColors';
import styles from '../../styles/Recipes/newRecipe';
import RecipeSteps from './RecipeStepsScreen';
import RecipeIngredients from './RecipeIngredientsScreen';

/* eslint max-statements: [2, 20] */
function FormRecipe(props) {
  const { navigation, route } = props;
  const recipe = (route.params && route.params.recipe) ? route.params.recipe : null;

  const [recipeName, setRecipeName] = useState(recipe ? recipe.attributes.name : '');
  const [recipeTime, setRecipeTime] = useState(recipe ? recipe.attributes.cook_minutes.toString() : '');
  const [recipePortions, setRecipePortions] = useState(recipe ? recipe.attributes.portions.toString() : '');
  const [recipeSteps, setRecipeSteps] = useState(recipe ? recipe.attributes.steps.data : []);
  const [recipeIngredients, setRecipeIngredients] = useState(recipe ?
    JSON.parse(JSON.stringify(route.params.ingredients)) : []);
  const createRecipe = useStoreActions((actions) => actions.createRecipe);
  const editRecipe = useStoreActions((actions) => actions.editRecipe);
  const createRecipeStep = useStoreActions((actions) => actions.createRecipeStep);
  const editRecipeStep = useStoreActions((actions) => actions.editRecipeStep);
  const deleteRecipeStep = useStoreActions((actions) => actions.deleteRecipeStep);

  function stepsActions(recipeId) {
    const promises = [];
    let k = 0;
    for (let i = 0; i < recipeSteps.length; i++) {
      if (('new' in recipeSteps[k]) && !('delete' in recipeSteps[k])) {
        promises.push(createRecipeStep({
          id: recipeId,
          body: recipeSteps[k].attributes,
        }));
      } else if (('delete' in recipeSteps[k]) && !('new' in recipeSteps[k])) {
        promises.push(deleteRecipeStep({
          recipeId,
          stepId: recipeSteps[k].id,
        }));
      } else if (('edit' in recipeSteps[k]) && !('delete' in recipeSteps[k]) && !('new' in recipeSteps[k])) {
        promises.push(editRecipeStep({
          recipeId,
          stepId: recipeSteps[k].id,
          body: recipeSteps[k].attributes,
        }));
      }
      if ('delete' in recipeSteps[k]) {
        const newStepsArray = recipeSteps;
        newStepsArray.splice(k, 1);
        setRecipeSteps(newStepsArray);
      } else {
        k++;
      }
    }

    return promises;
  }

  function searchIngredients() {
    navigation.navigate("Buscar ingredientes", recipe);
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
            <TouchableOpacity style={styles.ingredientButton} onPress={searchIngredients}>
              <Text>Buscar ingredientes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        { recipeIngredients.map((ingredient) =>
          <View style={styles.ingredientsList} key={ingredient.id}>
            <View style={ styles.ingredientTextBox }>
              <View style={styles.sectionQuantity}>
                <TextInput
                  style={styles.sectionQuantityInput}
                  keyboardType='numeric'
                  value={ingredient.recipeQuantity.toString()}
                  // onSubmitEditing={}
                />
                <Text style={styles.ingredientText}>{ingredient.measure}. </Text>
                <Text style={styles.ingredientText}> {ingredient.name}</Text>
              </View>
              <View style={styles.sectionPrice}>
                <Text style={styles.ingredientText}>$ {ingredient.currentPrice}</Text>
              </View>
            </View>
          </View>,
        )}
      </View>
      <View style={styles.ingredientsContainer}>
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
