import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../styles/Recipes/newRecipe';
import RecipeSteps from './RecipeStepsScreen';
import IngredientRow from '../../components/recipeEditIngredientRow';
import calculateRecipePrice from '../../utils/calculateRecipePrice';
import formatMoney from '../../utils/formatMoney';
import colors from '../../styles/appColors';

/* eslint max-statements: [2, 30] */
function FormRecipe(props) {
  const { navigation, route } = props;
  const recipe = (route.params && route.params.recipe) ? route.params.recipe : null;
  const setLoadRecipes = useStoreActions((actions) => actions.setLoadRecipes);

  const [recipeName, setRecipeName] = useState(recipe ? recipe.attributes.name : '');
  const [recipeTime, setRecipeTime] = useState(recipe ? recipe.attributes.cook_minutes.toString() : '');
  const [recipePortions, setRecipePortions] = useState(recipe ? recipe.attributes.portions.toString() : '');
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

  const createRecipeStep = useStoreActions((actions) => actions.createRecipeStep);
  const editRecipeStep = useStoreActions((actions) => actions.editRecipeStep);
  const deleteRecipeStep = useStoreActions((actions) => actions.deleteRecipeStep);

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
          ingredientId: ingredient.attributes.ingredient.id,
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
      const auxData = [];
      selectedIngredients.forEach((ingredient) => {
        const index = ingredientsData.findIndex((data) => data.ingredientId.toString() === ingredient.id.toString());
        if (index >= 0) {
          ingredientsData[index].isDeleted = false;
          auxIngredients.push({
            ...ingredientsData[index],
          });
        } else {
          const newIngredient = {
            ...ingredient.attributes,
            id: ingredient.attributes.name,
            ingredientId: ingredient.id,
            recipeIngredientId: null,
            recipeQuantity: 0,
            isNew: true,
            isEdited: false,
            isDeleted: false,
          };
          auxIngredients.push(newIngredient);
          auxData.push(newIngredient);
        }
      });
      setRecipeIngredients(auxIngredients);
      setIngredientsData(ingredientsData.concat(auxData));
      deletedIngredients.forEach((ingredientId) => {
        const index = ingredientsData.findIndex((data) => data.ingredientId.toString() === ingredientId.toString());
        if (index >= 0) {
          ingredientsData[index].isDeleted = true;
        }
      });
      setDeletedIngredients([]);
    }
  }, [selectedIngredients]);

  function changeIngredientDataQuantity(ingredientId, newQuantity) {
    const index = ingredientsData.findIndex((data) => data.ingredientId.toString() === ingredientId.toString());
    if (index >= 0) {
      ingredientsData[index].recipeQuantity = newQuantity;
      ingredientsData[index].isEdited = true;
    }
  }

  function stepsActions(recipeId) {
    const promises = [];
    recipeSteps.forEach((step) => {
      const newInStep = 'new' in step;
      const deleteInStep = 'delete' in step;
      const editInStep = 'edit' in step;
      if (newInStep && !deleteInStep) {
        promises.push(createRecipeStep({
          id: recipeId,
          body: step.attributes,
        }));
      } else if (deleteInStep && !newInStep) {
        promises.push(deleteRecipeStep({
          recipeId,
          stepId: step.id,
        }));
      } else if (editInStep && !deleteInStep && !newInStep) {
        promises.push(editRecipeStep({
          recipeId,
          stepId: step.id,
          body: step.attributes,
        }));
      }
    });

    return promises;
  }

  function ingredientsQuery() {
    const ingredientsList = [];
    ingredientsData.forEach((ingredient) => {
      if (ingredient.isNew) {
        if (ingredient.action !== 'delete') {
          ingredientsList.push({
            'ingredient_id': ingredient.ingredientId,
            'ingredient_quantity': ingredient.recipeQuantity,
          });
        }
      } else if (ingredient.isDeleted) {
        ingredientsList.push({ id: ingredient.recipeIngredientId, _destroy: true });
      } else if (ingredient.isEdited) {
        ingredientsList.push({
          id: ingredient.recipeIngredientId,
          'ingredient_id': ingredient.ingredientId,
          'ingredient_quantity': ingredient.recipeQuantity,
          _destroy: false,
        });
      }
    });

    return ingredientsList;
  }

  function searchIngredients() {
    navigation.navigate('Buscar ingredientes', recipe);
  }

  function handleSubmit() {
    const body = {
      name: recipeName,
      portions: parseInt(recipePortions, 10),
      // eslint-disable-next-line
      cook_minutes: parseInt(recipeTime, 10),
      // eslint-disable-next-line
      recipe_ingredients_attributes: ingredientsQuery(),
    };

    if (recipe) {
      editRecipe({ body, id: recipe.id })
        .then(() => Promise.all(stepsActions(recipe.id)))
        .then(() => {
          setLoadRecipes(true);
          navigation.navigate('Recetas', { recipe });
        })
        .catch(() => {
        });
    } else {
      createRecipe(body)
        .then((resp) => Promise.all(stepsActions(resp.data.data.id)))
        .then(() => {
          setLoadRecipes(true);
          navigation.navigate('Recetas', { recipe });
        })
        .catch(() => {});
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
        { recipeIngredients.map((ingredient) =>
          <IngredientRow
            ingredient={ingredient}
            key={ingredient.id}
            totalPrice={recipePrice}
            setTotalPrice={setRecipePrice}
            changeIngredientDataQuantity={changeIngredientDataQuantity}
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
    </ScrollView>
  );
}

export default FormRecipe;
