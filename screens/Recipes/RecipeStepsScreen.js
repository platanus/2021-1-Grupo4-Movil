import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import styles from '../../styles/Recipes/formRecipe';
import colors from '../../styles/appColors';

function RecipeStep(props) {
  const {
    recipeSteps,
    index,
    edit,
    options,
    setRecipeSteps,
    setEditStepIndex,
    setShowMenu,
    number,
  } = props;
  const [currentStepText, setCurrentStepText] = useState(recipeSteps[index].attributes.description);
  function openEditView() {
    setEditStepIndex(index);
    setShowMenu(null);
  }
  function deleteStep() {
    const steps = recipeSteps;
    steps[index].delete = true;
    setRecipeSteps(steps);
    setShowMenu(null);
  }
  function editStep() {
    const steps = recipeSteps;
    steps[index].attributes.description = currentStepText;
    steps[index].edit = true;
    setRecipeSteps(steps);
    setEditStepIndex(null);
    setShowMenu(null);
  }

  function cancelEditStep() {
    setEditStepIndex(null);
    setShowMenu(null);
    setCurrentStepText(recipeSteps[index].attributes.description);
  }

  if (!edit) {
    return (
      <View style={styles.containerWithBorder}>
        <View style={styles.stepBox} key={index}>
          <Text style={styles.stepNumber}>{number + 1}</Text>
          <Text style={styles.stepText}>{currentStepText}</Text>
          <Icon name='more-vert'
            size={22}
            color={colors.kitchengramGray600}
            onPress={(options ? () => setShowMenu(null) : () => setShowMenu(index))}/>
        </View>
        { options ?
          <>
            <TouchableOpacity style={[styles.stepMenuOption, styles.stepEdit]}
              onPress={openEditView}>
              <Text>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.stepMenuOption, styles.stepDelete]}
              onPress={deleteStep}>
              <Text>Eliminar</Text>
            </TouchableOpacity>
          </> : null }
      </View>
    );
  }

  return (
    <>
      <TextInput
        style={ styles.newStepText }
        value={currentStepText}
        onChangeText={setCurrentStepText}
        multiline={true}
      />
      <View style={ styles.sectionEditStepButtons }>
        <TouchableOpacity style={styles.stepCancelEditButton} onPress={cancelEditStep}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stepEditButton} onPress={editStep}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function NewStep(props) {
  const {
    recipeSteps,
    setRecipeSteps,
    stepsCount,
    setStepsCount,
  } = props;

  const [newStepDescription, setNewStepDescription] = useState('');

  function addStep() {
    const newStepsArray = recipeSteps;
    const newStep = {};
    newStep.attributes = {};
    newStep.attributes.description = newStepDescription;
    newStep.new = true;
    newStep.id = stepsCount;
    newStepsArray.push(newStep);
    setRecipeSteps(newStepsArray);
    setNewStepDescription('');
    setStepsCount(stepsCount + 1);
  }

  return (
    <>
      <TextInput
        style={styles.newStepText}
        placeholder="Nuevo paso"
        value={newStepDescription}
        onChangeText={setNewStepDescription}
        multiline={true}
        returnKeyType='done'
      />
      <View style={styles.sectionNewStep}>
        <TouchableOpacity style={styles.stepButton} onPress={addStep}>
          <Text style={styles.ingredientButtonText}>Agregar paso</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function RecipeSteps(props) {
  const {
    recipeSteps,
    setRecipeSteps,
    addDeleteStepId,
  } = props;

  const [editStepIndex, setEditStepIndex] = useState(null);
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const [stepsCount, setStepsCount] = useState(0);
  let i = 0;

  return (
    <View style={styles.stepsContainer}>
      <Text style={styles.sectionTitleText}>Pasos</Text>
      {
        recipeSteps.map((step, index) => (
          ('delete' in step) ? null :
            <RecipeStep
              key={index}
              index={index}
              number={i++}
              edit={(editStepIndex === index)}
              options={((editStepIndex === null) && (showMenuIndex === index))}
              recipeSteps={recipeSteps}
              setRecipeSteps={setRecipeSteps}
              setEditStepIndex={setEditStepIndex}
              setShowMenu={setShowMenuIndex}
              addDeleteStepId={addDeleteStepId}
            />))
      }
      <NewStep
        recipeSteps={recipeSteps}
        setRecipeSteps={setRecipeSteps}
        stepsCount={stepsCount}
        setStepsCount={setStepsCount}/>
    </View>
  );
}

export default RecipeSteps;
