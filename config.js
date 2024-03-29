const API_VERSION = 'api/v1';

const config = {
  endpoints: {
    users: {
      createUser: `${API_VERSION}/users/registrations`,
      logIn: `${API_VERSION}/users/sessions`,
      forgotPassword: `${API_VERSION}/users/forgot-password`,
      password: `${API_VERSION}/users/change-password`,
    },
    ingredients: {
      index: `${API_VERSION}/ingredients`,
      specific: `${API_VERSION}/ingredients/`,
      searchCornerShop: `${API_VERSION}/search-cornershop-products`,
      updateInventory: `${API_VERSION}/ingredients/update-inventories`,
    },
    recipes: {
      index: `${API_VERSION}/recipes`,
      specific: `${API_VERSION}/recipes/`,
      new: `${API_VERSION}/recipes`,
      steps: 'recipe_steps',
    },
    menus: {
      index: `${API_VERSION}/menus`,
      new: `${API_VERSION}/menus`,
      specific: `${API_VERSION}/menus/`,
    },
    providers: {
      index: `${API_VERSION}/providers`,
      specific: `${API_VERSION}/providers/`,
      new: `${API_VERSION}/providers`,
    },
  },
};

export default config;
