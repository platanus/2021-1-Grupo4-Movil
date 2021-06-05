function calculateRecipePrice(recipe) {
  let sum = 0;
  for (let k = 0; k < recipe.attributes.recipe_ingredients.data.length; k++) {
    const ingredient = recipe.attributes.recipe_ingredients.data[k].attributes;
    sum += ingredient.ingredient.price * ingredient.ingredient_quantity / ingredient.ingredient.quantity;
  }

  return sum;
}

export default calculateRecipePrice;
