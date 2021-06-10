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
    for (let k = 0; k < recipe.attributes.recipe_ingredients.data.length; k++) {
      const ingredient = recipe.attributes.recipe_ingredients.data[k].attributes;
      sum += ingredient.ingredient.price * ingredient.ingredient_quantity / ingredient.ingredient.quantity;
    }
  }

  return sum;
}

export default calculateRecipePrice;
