import { createStore, action, thunk, persist } from 'easy-peasy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUtils from '../api/api';
import sessionsApi from '../api/sessions';
import ingredientsApi from '../api/ingredients';
import recipesApi from '../api/recipes';
import menusApi from '../api/menus';
import providersApi from '../api/providers';

const reactNativeStorage = {
  async getItem(key) {
    const rawValue = await AsyncStorage.getItem(key);

    return JSON.parse(rawValue);
  },
  setItem(key, data) {
    const parsedValue = JSON.stringify(data);

    return AsyncStorage.setItem(key, parsedValue);
  },
  removeItem(key) {
    return AsyncStorage.removeItem(key);
  },
};

const storeState = {
  currentUser: persist({ email: '', authenticationToken: '' },
    { storage: reactNativeStorage }),
  loginError: '',
  signUpError: '',
  changePasswordError: '',
  forgotPasswordError: '',
  ingredientsError: '',
  loggedOutView: true,
  recipes: {
    getErrors: '',
    createErrors: '',
    deleteErrors: '',
    delete: false,
    load: true,
    currentSelectedIngredients: [],
    currentDeletedIngredients: [],
  },
  menus: {
    menus: [],
    selectedRecipes: [],
  },
  menusError: '',
  providersError: '',
  hasToGetRecipes: false,
  hasToGetMenus: false,
  hasToGetProviders: false,
  showLoadingSpinner: false,
  ingredientsInventory: {},
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
  setForgotPasswordError: action((state, payload) => {
    state.forgotPasswordError = payload;
  }),
  setLoggedOutView: action((state, payload) => {
    state.loggedOutView = payload;
  }),
  setChangePasswordError: action((state, payload) => {
    state.changePasswordError = payload;
  }),
  setLoginView: action((state, payload) => {
    state.loginView = payload;
  }),
  setUserAndApiHeaders: action((state, payload) => {
    if (payload.status === apiUtils.statusCodes.ok || payload.status === apiUtils.statusCodes.created) {
      const user = payload.data.data.attributes;
      state.currentUser = user;
      apiUtils.api.defaults.headers = { 'Accept': 'application/json',
        'Content-Type': 'application/json', 'X-User-Email': user.email,
        'X-User-Token': user.authenticationToken };
    }
  }),
  setIngredientsError: action((state, payload) => {
    state.ingredientsError = payload;
  }),
  setSelectedRecipeIngredients: action((state, payload) => {
    state.recipes.currentSelectedIngredients = payload;
  }),
  setDeletedRecipeIngredients: action((state, payload) => {
    state.recipes.currentDeletedIngredients = payload;
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
  setMenusError: action((state, payload) => {
    state.menusError = payload;
  }),
  setMenus: action((state, payload) => {
    state.menus.menus = payload;
  }),
  setMenuSelectedRecipes: action((state, payload) => {
    state.menus.selectedRecipes = payload;
  }),
  setProvidersError: action((state, payload) => {
    state.providersError = payload;
  }),
  setLogOut: action((state) => {
    state.currentUser = { email: '', authenticationToken: '' };
    apiUtils.api.defaults.headers = { 'Accept': 'application/json',
      'Content-Type': 'application/json' };
  }),
  setLoadRecipes: action((state, payload) => {
    state.recipes.load = payload;
  }),
  setHasToGetRecipes: action((state) => {
    state.hasToGetRecipes = !state.hasToGetRecipes;
  }),
  setHasToGetMenus: action((state) => {
    state.hasToGetMenus = !state.hasToGetMenus;
  }),
  setHasToGetProviders: action((state) => {
    state.hasToGetProviders = !state.hasToGetProviders;
  }),
  setShowLoadingSpinner: action((state) => {
    state.showLoadingSpinner = !state.showLoadingSpinner;
  }),
  setIngredientsInventory: action((state, payload) => {
    state.ingredientsInventory = payload;
  }),
};

const storeThunks = {
  login: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    await sessionsApi.login(payload)
      .then((resp) => {
        actions.setUserAndApiHeaders(resp);
        actions.setLoginError('');
        actions.setLoggedOutView('login');
      }).catch((error) => {
        try {
          actions.setLoginError(error.response.data.message);
        } catch (error2) {
          actions.setLoginError('hubo un problema de red');
        }
      });
    actions.setShowLoadingSpinner();
  }),
  signUp: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    await sessionsApi.signUp(payload)
      .then((resp) => {
        actions.setUserAndApiHeaders(resp);
        actions.setSignUpError('');
        actions.setLoggedOutView('login');
      }).catch((error) => {
        actions.setSignUpError(error.response.data.errors.email[0]);
      });
    actions.setShowLoadingSpinner();
  }),
  forgotPassword: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    await sessionsApi.forgotPassword(payload)
      .then(() => {
        actions.setForgotPasswordError('');
        actions.setLoggedOutView('login');
      }).catch((error) => {
        actions.setForgotPasswordError(error.response.data.message);
      });
    actions.setShowLoadingSpinner();
  }),
  changePassword: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    await sessionsApi.changePassword(payload)
      .catch((error) => {
        actions.setChangePasswordError(error.response.data.message);
        actions.setShowLoadingSpinner();
        throw error;
      });
    actions.setShowLoadingSpinner();
  }),
  getIngredients: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const ingredients = await ingredientsApi.getIngredients(payload)
      .then((res) => res.data.data)
      .catch((err) => {
        actions.setIngredientsError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();

    return ingredients;
  }),
  updateInventory: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    await ingredientsApi.updateInventory(payload)
      .catch((err) => {
        actions.setIngredientsError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();
  }),
  getIngredient: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const ingredient = await ingredientsApi.getIngredient(payload)
      .then((res) => res.data.data)
      .catch((err) => {
        actions.setIngredientsError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();

    return ingredient;
  }),
  getIngredientAssociations: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const associations = await ingredientsApi.getIngredientAssociations(payload)
      .then((res) => res.data.recipes)
      .catch((err) => {
        actions.setIngredientsError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();

    return associations;
  }),

  createIngredient: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const ingredient = await ingredientsApi.createIngredient(payload)
      .then((res) => res.data.data)
      .catch((err) => {
        actions.setIngredientsError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();

    return ingredient;
  }),
  editIngredient: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    await ingredientsApi.editIngredient(payload)
      .catch((err) => {
        actions.setIngredientsError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();
  }),
  deleteIngredient: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    await ingredientsApi.deleteIngredient(payload)
      .catch((err) => {
        actions.setIngredientsError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();
  }),
  searchCornerShop: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const ingredients = await ingredientsApi.searchCornerShop(payload)
      .then((res) => res.data.data)
      .catch((err) => {
        actions.setIngredientsError(err.response.data.message);
      });
    actions.setShowLoadingSpinner();

    return ingredients;
  }),
  getRecipes: thunk(async (actions, payload, { getStoreState }) => {
    const state = getStoreState();
    if (!state.hasToGetRecipes) actions.setShowLoadingSpinner();
    const recipes = await recipesApi.getRecipes(payload)
      .then((res) => res.data.data)
      .catch((err) => {
        actions.setGetRecipesError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    if (!state.hasToGetRecipes) actions.setShowLoadingSpinner();

    return recipes;
  }),
  getRecipe: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const recipe = await recipesApi.getRecipe(payload)
      .then((res) => res.data.data)
      .catch((err) => {
        actions.setGetRecipesError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();

    return recipe;
  }),
  createRecipe: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const recipe = await recipesApi.createRecipe(payload)
      .then((resp) => resp.data.data)
      .catch((err) => {
        actions.setCreateRecipeError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();

    return recipe;
  }),
  editRecipe: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    await recipesApi.editRecipe(payload)
      .then((resp) => resp.data)
      .catch((err) => {
        actions.setCreateRecipeError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();
  }),
  deleteRecipe: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    await recipesApi.deleteRecipe(payload)
      .then(() => {
        actions.setDeletedRecipe(true);
      })
      .catch((err) => {
        actions.setDeleteRecipeError(err);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();
  }),

  getRecipeAssociations: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const associations = await recipesApi.getRecipeAssociations(payload)
      .then((res) => res.data.menus)
      .catch((err) => {
        actions.setDeleteRecipeError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();

    return associations;
  }),

  createRecipeStep: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const step = await recipesApi.createRecipeStep(payload)
      .then((resp) => resp.data.data)
      .catch((err) => {
        actions.setCreateRecipeError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();

    return step;
  }),
  editRecipeStep: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const step = await recipesApi.editRecipeStep(payload)
      .then((resp) => resp.data)
      .catch((err) => {
        actions.setCreateRecipeError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();

    return step;
  }),
  deleteRecipeStep: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const resp = await recipesApi.deleteRecipeStep(payload)
      .then((res) => res.data)
      .catch((err) => {
        actions.setCreateRecipeError(err);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();

    return resp;
  }),
  getMenus: thunk(async (actions, payload, { getStoreState }) => {
    const state = getStoreState();
    if (!state.hasToGetMenus) actions.setShowLoadingSpinner();
    const menus = await menusApi.getMenus(payload)
      .then((res) => res.data.data)
      .catch((err) => {
        actions.setMenusError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    if (!state.hasToGetMenus) actions.setShowLoadingSpinner();

    return menus;
  }),
  getMenu: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const menu = await menusApi.getMenu(payload)
      .then((res) => res.data.data)
      .catch((err) => {
        actions.setMenusError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });

    actions.setShowLoadingSpinner();

    return menu;
  }),
  deleteMenu: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    await menusApi.deleteMenu(payload)
      .catch((err) => {
        actions.setMenusError(err);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();
  }),
  createMenu: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const menu = await menusApi.createMenu(payload)
      .then((resp) => resp.data)
      .catch((err) => {
        actions.setMenusError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();

    return menu;
  }),
  editMenu: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const menu = await menusApi.editMenu(payload)
      .then((resp) => resp.data)
      .catch((err) => {
        actions.setMenusError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();

    return menu;
  }),
  reduceInventory: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    await menusApi.reduceInventory(payload)
      .catch((err) => {
        actions.setMenusError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();
  }),

  getShoppingList: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const shoppingList = await menusApi.shoppingList(payload)
      .catch((err) => {
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();

    return shoppingList.data;
  }),
  getProviders: thunk(async (actions, payload, { getStoreState }) => {
    const state = getStoreState();
    if (!state.hasToGetProviders) actions.setShowLoadingSpinner();
    const providers = await providersApi.getProviders(payload)
      .then((res) => res.data.data)
      .catch((err) => {
        actions.setProvidersError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    if (!state.hasToGetProviders) actions.setShowLoadingSpinner();

    return providers;
  }),
  createProvider: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    const provider = await providersApi.createProvider(payload)
      .then((res) => res.data.data)
      .catch((err) => {
        actions.setProvidersError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();

    return provider;
  }),
  deleteProvider: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    await providersApi.deleteProvider(payload)
      .catch((err) => {
        actions.setProvidersError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();
  }),
  editProvider: thunk(async (actions, payload) => {
    actions.setShowLoadingSpinner();
    await providersApi.editProvider(payload)
      .catch((err) => {
        actions.setProvidersError(err.response.data.message);
        actions.setShowLoadingSpinner();
        throw err;
      });
    actions.setShowLoadingSpinner();
  }),
};

// eslint-disable-next-line no-undef
window.requestIdleCallback = null;
const generateStore = createStore({
  ...storeState,
  ...getters,
  ...storeActions,
  ...storeThunks,
});

export default generateStore;
