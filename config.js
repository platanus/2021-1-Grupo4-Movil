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
  },
};

export default config;
