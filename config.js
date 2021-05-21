const config = {
  endpoints: {
    users: {
      createUser: 'api/v1/users/registrations',
      logIn: 'api/v1/users/sessions',
    },
    ingredients: {
      index: '/api/v1/ingredients',
      specific: '/api/v1/ingredients/',
    },
    recipes: {
      index: 'api/v1/recipes',
      specific: 'api/v1/recipes/',
      new: 'api/v1/recipes',
      steps: 'recipe_steps',
    },
  },
};

export default config;
