function calculateRecipePrice(recipe, fromMenu = false) {
  let sum = 0;
  if (fromMenu) {
    sum = recipe.recipeIngredients.data.reduce((result, currentValue) => {
      const currentIngredient = currentValue.attributes;

      return (
        result +
      currentIngredient.ingredient.price * currentIngredient.ingredientQuantity / currentIngredient.ingredient.quantity
      );
    }, 0);
  } else {
    sum = recipe.attributes.recipeIngredients.data.reduce((result, currentValue) => {
      const currentIngredient = currentValue.attributes;

      return (
        result +
      currentIngredient.ingredient.price * currentIngredient.ingredientQuantity / currentIngredient.ingredient.quantity
      );
    }, 0);
  }

  return sum;
}

export default calculateRecipePrice;
