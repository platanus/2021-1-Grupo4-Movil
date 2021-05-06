import { createStore, action, thunk } from 'easy-peasy';
import config from '../config';
import apiUtils from '../api/api';
import sessionsApi from '../api/sessions';

const storeState = {
  currentUser: null,
  loginError: '',
  signUpError: '',
  ingredients: {
    getError: '',
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
    const url = config.endpoints.ingredients.index;
    const ingredients = await apiUtils.api({
      method: 'get',
      url,
      data: payload,
    })
      .then((res) => res.data.data)
      .catch((err) => {
        actions.setGetIngredientsError(err.response.data.message);
        throw err;
      });

    return ingredients;
  }),
  createIngredient: thunk(async (actions, payload) => {
    const url = config.endpoints.ingredients.index;
    const ingredients = await apiUtils.api({
      method: 'post',
      url,
      data: payload,
    })
      .catch((err) => {
        actions.setGetIngredientsError(err.response.data.message);
        throw err;
      });

    return ingredients;
  }),
  editIngredient: thunk(async (actions, payload) => {
    sessionsApi.editIngredient(payload)
      .catch((err) => {
        actions.setGetIngredientsError(err.response.data.message);
        throw err;
      });
  }),
  deleteIngredient: thunk(async (actions, payload) => {
    const url = `${config.endpoints.ingredients.specific}${payload.actualIngredient.id}`;
    await apiUtils.api({
      method: 'delete',
      url,
    })
      .catch((err) => {
        actions.setGetIngredientsError(err.response.data.message);
        throw err;
      });
  }),
};

const generateStore = createStore({
  ...storeState,
  ...getters,
  ...storeActions,
  ...storeThunks,
});

export default generateStore;
