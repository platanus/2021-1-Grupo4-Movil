function calculateRecipePrice(recipe, fromMenu = false) {
  let sum = 0;
  if (fromMenu) {
    sum = recipe.recipeIngredients.data.reduce((result, currentValue) => {
      const currentIngredient = currentValue.attributes;
      const currentMeasure = currentIngredient.ingredientMeasure ? currentIngredient.ingredientMeasure :
        currentIngredient.ingredient.measure;
      const measureQty = currentIngredient.ingredient.otherMeasures.data.find((measure =>
        measure.attributes.name === currentMeasure)).attributes.quantity;

      return (
        result +
      currentIngredient.ingredient.price * currentIngredient.ingredientQuantity / measureQty
      );
    }, 0);
  } else {
    sum = recipe.attributes.recipeIngredients.data.reduce((result, currentValue) => {
      const currentIngredient = currentValue.attributes;
      const currentMeasure = currentIngredient.ingredientMeasure ? currentIngredient.ingredientMeasure :
        currentIngredient.ingredient.measure;
      const measureQty = currentIngredient.ingredient.otherMeasures.data.find((measure =>
        measure.attributes.name === currentMeasure)).attributes.quantity;

      return (
        result +
      currentIngredient.ingredient.price * currentIngredient.ingredientQuantity / measureQty
      );
    }, 0);
  }

  return sum;
}

export default calculateRecipePrice;
