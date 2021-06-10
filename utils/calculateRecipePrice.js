function calculateRecipePrice(recipe, fromMenu = false) {
  let sum = 0;
  if (fromMenu) {
    sum = recipe.recipe_ingredients.data.reduce((result, currentValue) => {
      const currentIngredient = currentValue.attributes;

      return (
        result +
      currentIngredient.ingredient.price * currentIngredient.ingredient_quantity / currentIngredient.ingredient.quantity
      );
    }, 0);
  } else {
    sum = recipe.attributes.recipe_ingredients.data.reduce((result, currentValue) => {
      const currentIngredient = currentValue.attributes;

      return (
        result +
      currentIngredient.ingredient.price * currentIngredient.ingredient_quantity / currentIngredient.ingredient.quantity
      );
    }, 0);
  }

  return sum;
}

export default calculateRecipePrice;
