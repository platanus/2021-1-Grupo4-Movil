const API_VERSION = 'api/v1';

const config = {
  endpoints: {
    users: {
      createUser: `${API_VERSION}/users/registrations`,
      logIn: `${API_VERSION}/users/sessions`,
    },
    ingredients: {
      index: `${API_VERSION}/ingredients`,
      specific: `${API_VERSION}/ingredients/`,
      searchCornerShop: `${API_VERSION}/search-cornershop-products`,
    },
    recipes: {
      index: `${API_VERSION}/recipes`,
      specific: `${API_VERSION}/recipes/`,
      new: `${API_VERSION}/recipes`,
      steps: 'recipe_steps',
    },
    menus: {
      index: `${API_VERSION}/menus`,
    },
  },
};

export default config;
