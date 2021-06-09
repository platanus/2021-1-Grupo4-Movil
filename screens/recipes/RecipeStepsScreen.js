import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import styles from '../../styles/Recipes/newRecipe';

function RecipeStep({ recipeSteps, index, edit, options, setRecipeSteps, setEditStepIndex, setShowMenu, number }) {
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
      <>
        <View style={styles.stepBox} key={index}>
          <Text style={styles.stepNumber}>{number + 1}</Text>
          <Text style={styles.stepText}>{currentStepText}</Text>
          <Icon name='more-vert'
            size={30}
            style={styles.moreVert}
            onPress={(options ? () => setShowMenu(null) : () => setShowMenu(index))}/>
        </View>
        { options ?
          <>
            <TouchableOpacity key={index} style={styles.stepMenuOption}
              onPress={openEditView}>
              <Text>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity key={index} style={styles.stepMenuOption}
              onPress={deleteStep}>
              <Text>Eliminar</Text>
            </TouchableOpacity>
          </> : null }
      </>
    );
  }

  return (
    <View key={index}>
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
    </View>
  );
}

function NewStep({ recipeSteps, setRecipeSteps, stepsCount, setStepsCount }) {
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
        style={ styles.newStepText }
        placeholder="Nuevo paso"
        value={newStepDescription}
        onChangeText={setNewStepDescription}
      />
      <View style={ styles.sectionNewStep }>
        <TouchableOpacity style={styles.stepButton} onPress={addStep}>
          <Text>Agregar paso</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function RecipeSteps({ recipeSteps, setRecipeSteps, addDeleteStepId }) {
  const [editStepIndex, setEditStepIndex] = useState(null);
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const [stepsCount, setStepsCount] = useState(0);
  let i = 0;

  const swapStep = (currentStep, adder) => {
    console.log()
    console.log(recipeSteps)
    const stepIndex = recipeSteps.indexOf(currentStep)
    const stepsInNewOrder = recipeSteps.filter((step) => step != currentStep)
    stepsInNewOrder.splice(adder(stepIndex), 0, currentStep) 
    stepsInNewOrder.forEach((stepObject, index) => {
      stepObject.id = index
      }
    )
    console.log(stepsInNewOrder)
    console.log()
    console.log()
    setRecipeSteps(stepsInNewOrder)
  }

  return (
    <View style={styles.stepsContainer}>
      <Text style={styles.sectionTitleText}>Pasos</Text>
      {
        recipeSteps.map((step, index) => (
          ('delete' in step) ? null :
            (
            <>
              <RecipeStep key={index}
                index={index}
                number={i++}
                edit={(editStepIndex === index)}
                options={((editStepIndex === null) && (showMenuIndex === index))}
                recipeSteps={recipeSteps}
                setRecipeSteps={setRecipeSteps}
                setEditStepIndex={setEditStepIndex}
                setShowMenu={setShowMenuIndex}
                addDeleteStepId={addDeleteStepId}
              />
              <TouchableOpacity
                key={index}
                disabled={index === 0}
                onPress={ () => swapStep(step, (stepIndex) => stepIndex - 1) }
                >
                <Text>
                  Subir paso
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                key={index}
                disabled={index === (recipeSteps.length - 1)}
                onPress={ () => swapStep(step, (stepIndex) => stepIndex + 1) }
                >
                <Text>
                  Bajar paso
                </Text>
              </TouchableOpacity>
            </>
            )))
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
