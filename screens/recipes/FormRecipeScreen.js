import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { decamelizeKeys } from 'humps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../styles/Recipes/formRecipe';
import RecipeSteps from './RecipeStepsScreen';
import IngredientRow from '../../components/recipeEditIngredientRow';
import calculateRecipePrice from '../../utils/calculateRecipePrice';
import formatMoney from '../../utils/formatMoney';

/* eslint max-statements: [2, 30] */
function FormRecipe(props) {
  const {
    navigation,
    route,
  } = props;
  const recipe = (route.params && route.params.recipe) && route.params.recipe;
  const {
    recipes,
    setRecipes,
  } = route.params;

  const [recipeName, setRecipeName] = useState(recipe.attributes.name ? recipe.attributes.name : '');
  const [recipeTime, setRecipeTime] = useState(recipe.attributes.cookMinutes ?
    recipe.attributes.cookMinutes.toString() : '');
  const [recipePortions, setRecipePortions] = useState(recipe.attributes.portions ?
    recipe.attributes.portions.toString() : '');
  const [recipeSteps, setRecipeSteps] = useState(
    recipe.attributes.steps.data ? JSON.parse(JSON.stringify(recipe.attributes.steps.data)) : []);

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
      recipe.attributes.recipeIngredients.data.forEach((ingredient) => {
        auxIngredients.push({
          attributes: ingredient.attributes.ingredient,
        });
        auxRecipeIngredients.push({
          ...ingredient.attributes.ingredient,
          id: ingredient.attributes.ingredient.id,
          recipeIngredientId: ingredient.id,
          recipeQuantity: ingredient.attributes.ingredientQuantity,
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            name: ingredient.attributes.name,
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        ingredientsList.push(decamelizeKeys({
          id: ingredient.recipeIngredientId,
          ingredientId: ingredient.id,
          ingredientQuantity: ingredient.recipeQuantity,
          _destroy: false,
        }));
      }
    });

    return ingredientsList;
  }

  function searchIngredients() {
    navigation.navigate('Buscar ingredientes', {
      isNewRecipe: !(recipe),
      recipe,
      recipes,
      setRecipes,
    });
  }

  function changeRecipeLocally(body) {
    recipe.attributes.name = body.name;
    recipe.attributes.portions = body.portions;
    recipe.attributes.cookMinutes = body.cookMinutes;
  }

  function handleSubmit() {
    const body = {
      name: recipeName,
      portions: parseInt(recipePortions, 10),
      cookMinutes: parseInt(recipeTime, 10),
      recipeIngredientsAttributes: ingredientsQuery(),
      stepsAttributes: stepsActions(),
    };

    if (recipe) {
      changeRecipeLocally(body);
      editRecipe({ body, id: recipe.id })
        .then(() => {
          const auxRecipes = recipes.filter(item => item.id !== recipe.id);
          auxRecipes.push(recipe);
          setRecipes(auxRecipes);
          navigation.navigate('Recetas');
        })
        .catch(() => {
        });
    } else {
      createRecipe(body)
        .then((resp) => {
          const auxRecipes = [...recipes];
          auxRecipes.push(resp);
          setRecipes(auxRecipes);
          navigation.navigate('Recetas');
        })
        .catch(() => {
        });
    }
  }

  return (
    <ScrollView style={styles.mainContainer}>
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
      <View style={styles.ingredientsContainer}>
        {recipeIngredients.map((ingredient) =>
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
              {(recipePortions > 0) && formatMoney(Math.round(recipePrice / Number(recipePortions)), '$ ')}
            </Text>
          </View>
        </View>
        <View style={ styles.totalCostTextBox }>
          <View style={styles.sectionQuantity}>
            <Text style={styles.totalCostText}>Costo total</Text>
          </View>
          <View style={styles.sectionPrice}>
            <Text style={styles.totalCostPrice}>
              {formatMoney(Math.round(recipePrice), '$ ')}
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
    </ScrollView>
  );
}

export default FormRecipe;
