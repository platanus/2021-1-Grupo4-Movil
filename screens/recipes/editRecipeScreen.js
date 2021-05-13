import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { useStoreActions } from 'easy-peasy';
import styles from '../../styles/Recipes/newRecipe';
import colors from '../../styles/appColors';

function RecipeStep({ recipeSteps, index, edit, options, setRecipeSteps, setEditStepIndex, setShowMenu }) {
  const [currentStepText, setCurrentStepText] = useState(recipeSteps[index]);

  function pressEditButton() {
    setEditStepIndex(index);
    setShowMenu(null);
  }
  function deleteStep() {
    const steps = recipeSteps;
    steps.splice(index, 1);
    setRecipeSteps(steps);
    setShowMenu(null);
  }
  function editStep() {
    const steps = recipeSteps;
    steps[index] = currentStepText;
    setRecipeSteps(steps);
    setEditStepIndex(null);
    setShowMenu(null);
  }

  function cancelEditStep() {
    setEditStepIndex(null);
    setShowMenu(null);
  }

  if (!edit) {
    return (
      <>
        <View style={styles.stepBox} key={index}>
          <Text style={styles.stepNumber}>{index + 1}</Text>
          <Text style={styles.stepText}>{recipeSteps[index]}</Text>
          <Icon name='more-vert'
            size='30'
            style={styles.moreVert}
            onPress={(options ? () => setShowMenu(null) : () => setShowMenu(index))}/>
        </View>
        { options ?
          <>
            <TouchableOpacity style={styles.stepMenuOption}
              onPress={pressEditButton}>
              <Text>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stepMenuOption}
              onPress={deleteStep}>
              <Text>Eliminar</Text>
            </TouchableOpacity>
          </> : null }
      </>
    );
  }

  return (
    <>
      <TextInput
        style={ styles.newStepText }
        value={currentStepText}
        onChangeText={setCurrentStepText}
      />
      <View style={ styles.sectionEditStepButtons }>
        <TouchableOpacity style={styles.stepCancelEditButton} onPress={cancelEditStep}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stepEditButton} onPress={editStep}>
          <Text>Editar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function NewStep({ recipeSteps, setRecipeSteps, stepsCount, setStepsCount }) {
  const [newStep, setNewStep] = useState('');

  function addStep() {
    const newStepsArray = recipeSteps;
    newStepsArray.push(newStep);
    setRecipeSteps(newStepsArray);
    setNewStep('');
    setStepsCount(stepsCount + 1);
  }

  return (
    <>
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
    </>
  );
}

/* eslint max-statements: [2, 20] */
function EditRecipe({ navigation, route }) {
  const recipe = route ? route.params : null;
  const [recipeName, setRecipeName] = useState(recipe ? recipe.attributes.name : '');
  const [recipePortions, setRecipePortions] = useState(recipe ? recipe.attributes.portions : '');
  const [recipeTime, setRecipeTime] = useState(recipe ? recipe.attributes.cook_minutes : '');
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [editStepIndex, setEditStepIndex] = useState(null);
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const [stepsCount, setStepsCount] = useState(0);
  const editRecipe = useStoreActions((actions) => actions.editRecipe);
  const createRecipe = useStoreActions((actions) => actions.createRecipe);
  function handleSubmit() {
    const body = {
      name: recipeName,
      portions: recipePortions,
      // eslint-disable-next-line
      cook_minutes: recipeTime,
    };

    if (recipe) {
      editRecipe({ body, id: recipe.id })
        .then(() => {
          navigation.navigate('Recetas', {
            recipe,
          });
        })
        .catch(() => {
        });
    } else {
      createRecipe(body)
        .then(() => {
          navigation.navigate('Recetas', {
            recipe,
          });
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
        {
          recipeSteps.map((step, index) => (
            <RecipeStep key={index}
              index={index}
              stepText={step}
              edit={(editStepIndex === index)}
              options={((editStepIndex === null) && (showMenuIndex === index))}
              recipeSteps={recipeSteps}
              setRecipeSteps={setRecipeSteps}
              setEditStepIndex={setEditStepIndex}
              setShowMenu={setShowMenuIndex}
            />))
        }
        <NewStep
          recipeSteps={recipeSteps}
          setRecipeSteps={setRecipeSteps}
          stepsCount={stepsCount}
          setStepsCount={setStepsCount}/>
      </View>
      <View style={styles.container}>
        {/* (recipe ? submitEditedRecipe : submitNewRecipe) */}
        <TouchableOpacity style={styles.submitNewRecipe} onPress={handleSubmit}>
          <Text style={styles.newRecipeButtonText}>{recipe ? 'Editar receta' : 'Crear receta'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default EditRecipe;
