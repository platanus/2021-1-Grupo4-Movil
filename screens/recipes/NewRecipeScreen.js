import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../styles/appColors';
import styles from '../../styles/Recipes/newRecipe';
import RecipeSteps from './RecipeStepsScreen';
import IngredientRow from '../../components/recipeEditIngredientRow';
import calculateRecipePrice from '../../utils/calculateRecipePrice';

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

  function stepsActions(recipeId) {
    const promises = [];
    for (let i = 0; i < recipeSteps.length; i++) {
      if (('new' in recipeSteps[i]) && !('delete' in recipeSteps[i])) {
        promises.push(createRecipeStep({
          id: recipeId,
          body: recipeSteps[i].attributes,
        }));
      } else if (('delete' in recipeSteps[i]) && !('new' in recipeSteps[i])) {
        promises.push(deleteRecipeStep({
          recipeId,
          stepId: recipeSteps[i].id,
        }));
      } else if (('edit' in recipeSteps[i]) && !('delete' in recipeSteps[i]) && !('new' in recipeSteps[i])) {
        promises.push(editRecipeStep({
          recipeId,
          stepId: recipeSteps[i].id,
          body: recipeSteps[i].attributes,
        }));
      }
    }

    return promises;
  }

  function ingredientsQuery() {
    const ingredientsList = [];
    ingredientsData.forEach((ingredient) => {
      if (ingredient.isNew) {
        if (!ingredient.isDeleted) {
          ingredientsList.push({
            'ingredient_id': ingredient.id,
            'ingredient_quantity': ingredient.recipeQuantity,
          });
        }
      } else if (ingredient.isDeleted) {
        ingredientsList.push({ id: ingredient.recipeIngredientId, _destroy: true });
      } else if (ingredient.isEdited) {
        ingredientsList.push({
          id: ingredient.recipeIngredientId,
          'ingredient_id': ingredient.id,
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
        <View style={ styles.ingredientTextBox }>
          <View style={styles.sectionQuantity}>
            <Text>Costo total{'\n'}Costo Unitario</Text>
          </View>
          <View style={styles.sectionPrice}>
            <Text style={ { ...styles.ingredientText, color: colors.purplePrice } }>
              ${Math.round(recipePrice)} {'\n'}${Math.round(recipePrice / Number(recipePortions))} c/u
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
