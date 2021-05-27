import { createStore, action, thunk } from 'easy-peasy';
import apiUtils from '../api/api';
import sessionsApi from '../api/sessions';
import ingredientsApi from '../api/ingredients';
import recipesApi from '../api/recipes';

const storeState = {
  currentUser: null,
  loginError: '',
  signUpError: '',
  ingredients: {
    getError: '',
    currentSelected: [],
  },
  recipes: {
    getErrors: '',
    createErrors: '',
    deleteErrors: '',
    delete: false,
  },
};

const getters = {
  /*
  enabledAndHistoricalBankAccounts: computed(state => (
    state.bankAccounts.filter((bankAccount => bankAccount.active && bankAccount.withMatches))
  )),
  */
};

const storeActions = {
  setLoginError: action((state, payload) => {
    state.loginError = payload;
  }),
  setSignUpError: action((state, payload) => {
    state.signUpError = payload;
  }),
  setUserAndApiHeaders: action((state, payload) => {
    if (payload.status === apiUtils.statusCodes.ok || payload.status === apiUtils.statusCodes.created) {
      const user = payload.data.data.attributes;
      state.currentUser = user;
      apiUtils.api.defaults.headers = { 'Accept': 'application/json',
        'Content-Type': 'application/json', 'X-User-Email': user.email,
        'X-User-Token': user.authentication_token };
    }
  }),
  setGetIngredientsError: action((state, payload) => {
    state.ingredients.getErrors = payload;
  }),
  setSelectedIngredient: action((state, payload) => {
    state.ingredients.currentSelected.push(payload);
  }),
  setGetRecipesError: action((state, payload) => {
    state.recipes.getErrors = payload;
  }),
  setCreateRecipeError: action((state, payload) => {
    state.recipes.createErrors = payload;
  }),
  setDeleteRecipeError: action((state, payload) => {
    state.recipes.deleteErrors = payload;
  }),
  setDeletedRecipe: action((state, payload) => {
    state.recipes.delete = payload;
  }),
  setLogOut: action((state) => {
    state.currentUser = null;
    apiUtils.api.defaults.headers = { 'Accept': 'application/json',
      'Content-Type': 'application/json' };
  }),
};

const storeThunks = {
  login: thunk(async (actions, payload) => {
    sessionsApi.login(payload)
      .then((resp) => {
        actions.setUserAndApiHeaders(resp);
      }).catch((error) => {
        actions.setLoginError(error.response.data.message);
      });
  }),
  signUp: thunk(async (actions, payload) => {
    sessionsApi.signUp(payload)
      .then((resp) => {
        actions.setUserAndApiHeaders(resp);
      }).catch((error) => {
        actions.setSignUpError(error.response.data.message);
      });
  }),
  getIngredients: thunk(async (actions, payload) => {
    const ingredients = ingredientsApi.getIngredients(payload)
      .then((res) => res.data.data)
      .catch((err) => {
        actions.setGetIngredientsError(err.response.data.message);
        throw err;
      });

    return ingredients;
  }),
  createIngredient: thunk(async (actions, payload) => {
    const ingredient = ingredientsApi.createIngredient(payload)
      .then((res) => res.data.data)
      .catch((err) => {
        actions.setGetIngredientsError(err.response.data.message);
        throw err;
      });

    return ingredient;
  }),
  editIngredient: thunk(async (actions, payload) => {
    ingredientsApi.editIngredient(payload)
      .catch((err) => {
        actions.setGetIngredientsError(err.response.data.message);
        throw err;
      });
  }),
  deleteIngredient: thunk(async (actions, payload) => {
    ingredientsApi.deleteIngredient(payload)
      .catch((err) => {
        actions.setGetIngredientsError(err.response.data.message);
        throw err;
      });
  }),
  getRecipes: thunk(async (actions, payload) => {
    const recipes = recipesApi.getRecipes(payload)
      .then((res) => res.data.data)
      .catch((err) => {
        actions.setGetRecipesError(err.response.data.message);
        throw err;
      });

    return recipes;
  }),
  createRecipe: thunk(async (actions, payload) => {
    const recipe = recipesApi.createRecipe(payload)
      .then((resp) => resp)
      .catch((err) => {
        actions.setCreateRecipeError(err.response.data.message);
      });

    return recipe;
  }),
  editRecipe: thunk(async (actions, payload) => {
    recipesApi.editRecipe(payload)
      .then((resp) => resp.data)
      .catch((err) => {
        actions.setEditRecipeError(err.response.data.message);

        throw err;
      });
  }),
  deleteRecipe: thunk(async (actions, payload) => {
    recipesApi.deleteRecipe(payload)
      .then(() => {
        actions.setDeletedRecipe(true);
      })
      .catch((err) => {
        actions.setDeleteRecipeError(err);
        throw err;
      });
  }),

  createRecipeStep: thunk(async (actions, payload) => {
    const step = recipesApi.createRecipeStep(payload)
      .then((resp) => resp.data.data)
      .catch((err) => {
        actions.setEditRecipeError(err.response.data.message);

        throw err;
      });

    return step;
  }),
  editRecipeStep: thunk(async (actions, payload) => {
    const step = recipesApi.editRecipeStep(payload)
      .then((resp) => resp.data)
      .catch((err) => {
        actions.setEditRecipeError(err.response.data.message);

        throw err;
      });

    return step;
  }),
  deleteRecipeStep: thunk(async (actions, payload) => {
    const resp = recipesApi.deleteRecipeStep(payload)
      .then((res) => res.data)
      .catch((err) => {
        actions.setEditRecipeError(err);
        throw err;
      });

    return resp;
  }),
};

const generateStore = createStore({
  ...storeState,
  ...getters,
  ...storeActions,
  ...storeThunks,
});

export default generateStore;
