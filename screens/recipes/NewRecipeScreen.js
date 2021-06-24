import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../styles/Recipes/newRecipe';
import RecipeSteps from './RecipeStepsScreen';
import IngredientRow from '../../components/recipeEditIngredientRow';
import calculateRecipePrice from '../../utils/calculateRecipePrice';
import formatMoney from '../../utils/formatMoney';
import KeyboardAvoidWrapper from '../../components/KeyboardAvoidWrapper';

/* eslint max-statements: [2, 30] */
function FormRecipe(props) {
  const { navigation, route } = props;
  const recipe = (route.params && route.params.recipe) ? route.params.recipe : null;
  const setLoadRecipes = useStoreActions((actions) => actions.setLoadRecipes);

  const [recipeName, setRecipeName] = useState(recipe && recipe.attributes.name ? recipe.attributes.name : '');
  const [recipeTime, setRecipeTime] = useState(recipe && recipe.attributes.cook_minutes ?
    recipe.attributes.cook_minutes.toString() : '');
  const [recipePortions, setRecipePortions] = useState(recipe && recipe.attributes.portions ?
    recipe.attributes.portions.toString() : '');
  const [recipeSteps, setRecipeSteps] = useState(
    recipe ? JSON.parse(JSON.stringify(recipe.attributes.steps.data)) : []);

  const [recipePrice, setRecipePrice] = useState(recipe ? calculateRecipePrice(recipe) : 0);
  const createRecipe = useStoreActions((actions) => actions.createRecipe);
  const editRecipe = useStoreActions((actions) => actions.editRecipe);

  const selectedIngredients = useStoreState((state) => state.recipes.currentSelectedIngredients);
  const setIngredientsAction = useStoreActions((actions) => actions.setSelectedRecipeIngredients);
  const deletedIngredients = useStoreState((state) => state.recipes.currentDeletedIngredients);
  const setDeletedIngredients = useStoreActions((actions) => actions.setDeletedRecipeIngredients);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([]);

  const [isStarting, setIsStarting] = useState(true);

  useEffect(() => {
    if (recipe) {
      const auxIngredients = [];
      const auxRecipeIngredients = [];
      route.params.recipe.attributes.recipe_ingredients.data.forEach((ingredient) => {
        auxIngredients.push({
          id: ingredient.attributes.ingredient.id,
          attributes: ingredient.attributes.ingredient,
        });
        auxRecipeIngredients.push({
          ...ingredient.attributes.ingredient,
          id: ingredient.attributes.ingredient.id,
          recipeIngredientId: ingredient.id,
          recipeQuantity: ingredient.attributes.ingredient_quantity,
          isNew: false,
          isDeleted: false,
          isEdited: false,
        });
      });
      setRecipeIngredients(auxRecipeIngredients);
      setIngredientsData(auxRecipeIngredients);
      setIngredientsAction(auxIngredients);
    } else {
      setIngredientsAction([]);
    }
    setIsStarting(false);
  }, []);

  useEffect(() => {
    if (!isStarting) {
      const auxIngredients = [];
      let price = 0;
      selectedIngredients.forEach((ingredient) => {
        const index = ingredientsData.findIndex((data) => data.id.toString() === ingredient.id.toString());
        if (index >= 0) {
          ingredientsData[index].isDeleted = false;
          price += ingredientsData[index].recipeQuantity * ingredientsData[index].price /
             ingredientsData[index].quantity;
          auxIngredients.push({
            ...ingredientsData[index],
          });
        } else {
          const newIngredient = {
            ...ingredient.attributes,
            id: ingredient.id,
            recipeIngredientId: null,
            recipeQuantity: 0,
            isNew: true,
            isEdited: false,
            isDeleted: false,
          };
          auxIngredients.push(newIngredient);
          ingredientsData.push(newIngredient);
        }
      });
      setRecipePrice(price);
      setRecipeIngredients(auxIngredients);
      deletedIngredients.forEach((ingredientId) => {
        const index = ingredientsData.findIndex((data) => data.id.toString() === ingredientId.toString());
        if (index >= 0) {
          ingredientsData[index].isDeleted = true;
        }
      });
      setDeletedIngredients([]);
    }
  }, [selectedIngredients]);

  function changeIngredientDataQuantity(ingredientId, newQuantity) {
    const index = ingredientsData.findIndex((data) => data.id.toString() === ingredientId.toString());
    if (index >= 0) {
      ingredientsData[index].recipeQuantity = newQuantity;
      ingredientsData[index].isEdited = true;
    }
  }

  function deleteIngredient(ingredientId) {
    setDeletedIngredients([ingredientId]);
    const recipesIndex = recipeIngredients.findIndex((ingredient) =>
      ingredient.id.toString() === ingredientId.toString());
    const auxIngredients = recipeIngredients;
    auxIngredients.splice(recipesIndex, 1);
    setIngredientsAction(auxIngredients);
  }

  function stepsActions() {
    const stepsToModify = [];
    recipeSteps.forEach((step) => {
      const newInStep = 'new' in step;
      const deleteInStep = 'delete' in step;
      const editInStep = 'edit' in step;
      if (newInStep && !deleteInStep) {
        stepsToModify.push({ description: step.attributes.description });
      } else if (deleteInStep && !newInStep) {
        stepsToModify.push({ id: step.id, _destroy: true });
      } else if (editInStep && !deleteInStep && !newInStep) {
        stepsToModify.push({ id: step.id, description: step.attributes.description, _destroy: false });
      }
    });

    return stepsToModify;
  }

  function ingredientsQuery() {
    const ingredientsList = [];
    ingredientsData.forEach((ingredient) => {
      if (ingredient.isNew) {
        if (!ingredient.isDeleted) {
          ingredientsList.push({
            ingredientId: ingredient.id,
            ingredientQuantity: ingredient.recipeQuantity,
          });
        }
      } else if (ingredient.isDeleted) {
        ingredientsList.push({ id: ingredient.recipeIngredientId, _destroy: true });
      } else if (ingredient.isEdited) {
        ingredientsList.push({
          id: ingredient.recipeIngredientId,
          ingredientId: ingredient.id,
          ingredientQuantity: ingredient.recipeQuantity,
          _destroy: false,
        });
      }
    });

    return ingredientsList;
  }

  function searchIngredients() {
    navigation.navigate('Buscar ingredientes', recipe);
  }

  function checkValidInputs() {
    const validations = [
      { error: !recipeName.length, message: 'Debes asignar un nombre a la receta' },
      { error: recipePortions <= 0, message: 'Debes ingresar porciones válidas' },
      { error: recipeTime <= 0, message: 'Debes ingresar un tiempo de preparación válida' },
      { error: !recipeIngredients.length, message: 'Debes ingresar uno o más ingredientes' },
      { error: !recipeSteps.length, message: 'Debes ingresar uno o más pasos' },
    ];
    const error = validations.find((validation) => (validation.error));
    if (error) {
      alert(error.message);

      return false;
    }

    return true;
  }

  function handleSubmit() {
    if (!checkValidInputs()) return;

    const body = {
      name: recipeName,
      portions: parseInt(recipePortions, 10),
      cookMinutes: parseInt(recipeTime, 10),
      recipeIngredientsAttributes: ingredientsQuery(),
      stepsAttributes: stepsActions(),
    };

    if (recipe) {
      editRecipe({ body, id: recipe.id })
        .then(() => {
          setLoadRecipes(true);
          navigation.navigate('Recetas', { recipe });
        })
        .catch(() => {
        });
    } else {
      createRecipe(body)
        .then(() => {
          setLoadRecipes(true);
          navigation.navigate('Recetas', { recipe });
        })
        .catch(() => {});
    }
  }

  return (
    <KeyboardAvoidWrapper>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.sectionTitleText}>Datos básicos</Text>
          <View style={styles.inlineInputs}>
            <View style={styles.recipeInfoRow}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.sectionTextInput}
                value={recipeName}
                onChangeText={setRecipeName}/>
            </View>
          </View>
          <View style={styles.inlineInputs}>
            <View style={styles.recipeInfoRowHalf}>
              <Text style={styles.label}>Porciones</Text>
              <TextInput
                keyboardType="number-pad"
                returnKeyType='done'
                style={styles.sectionTextInput}
                value={recipePortions}
                onChangeText={setRecipePortions}/>
            </View>
            <View style={styles.recipeInfoRowHalf}>
              <Text style={styles.label}>Tiempo (minutos)</Text>
              <TextInput
                keyboardType="number-pad"
                returnKeyType='done'
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
                <Text style={styles.ingredientButtonText}>Buscar ingredientes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        { recipeIngredients.map((ingredient) =>
          <IngredientRow
            ingredient={ingredient}
            key={ingredient.id}
            totalPrice={recipePrice}
            setTotalPrice={setRecipePrice}
            changeIngredientDataQuantity={changeIngredientDataQuantity}
            deleteIngredient={deleteIngredient}
          />,
        )}
      </View>
      <View style={styles.ingredientsContainer}>
        <View style={ styles.totalCostTextBox }>
          <View style={styles.sectionQuantity}>
            <Text style={styles.totalCostText}>Costo por porción</Text>
          </View>
          <View style={styles.sectionPrice}>
            <Text style={styles.totalCostPrice}>
              {formatMoney(Math.round(recipePrice / Number(recipePortions)), '$')}
            </Text>
          </View>
        </View>
        <View style={styles.ingredientsContainer}>
          <View style={ styles.totalCostTextBox }>
            <View style={styles.sectionQuantity}>
              <Text style={styles.totalCostText}>Costo por porción</Text>
            </View>
            <View style={styles.sectionPrice}>
              <Text style={styles.totalCostPrice}>
                {formatMoney(Math.round(recipePrice / Number(recipePortions)), '$')}
              </Text>
            </View>
          </View>
          <View style={ styles.totalCostTextBox }>
            <View style={styles.sectionQuantity}>
              <Text style={styles.totalCostText}>Costo total</Text>
            </View>
            <View style={styles.sectionPrice}>
              <Text style={styles.totalCostPrice}>
                {formatMoney(Math.round(recipePrice), '$')}
              </Text>
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
      </View>
    </KeyboardAvoidWrapper>
  );
}

export default FormRecipe;
