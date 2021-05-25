const config = {
  endpoints: {
    users: {
      createUser: 'api/v1/users/registrations',
      logIn: 'api/v1/users/sessions',
    },
    ingredients: {
      index: '/api/v1/ingredients',
      specific: '/api/v1/ingredients/',
      searchCornerShop: '/api/v1/search-cornershop-products',
    },
    recipes: {
      index: 'api/v1/recipes',
      specific: 'api/v1/recipes/',
    },
  },
};

export default config;
