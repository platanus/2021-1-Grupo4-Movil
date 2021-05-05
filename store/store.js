import { createStore, action, thunk } from 'easy-peasy';
import config from '../config';
import apiUtils from '../api/api';

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
  addCurrentUser: action((state, payload) => {
    state.currentUser = payload;
  }),
  setLoginError: action((state, payload) => {
    state.loginError = payload;
  }),
  setSignUpError: action((state, payload) => {
    state.signUpError = payload;
  }),
  setGetIngredientsError: action((state, payload) => {
    state.ingredients.getErrors = payload;
  }),
};

const storeThunks = {
  sendCredentials: thunk(async (actions, payload) => {
    const url = payload.logIn ? config.endpoints.users.logIn : config.endpoints.users.createUser;
    await apiUtils.api({
      method: 'post',
      url,
      data: payload,
    }).then((resp) => {
      if (resp.status === apiUtils.statusCodes.ok || resp.status === apiUtils.statusCodes.created) {
        const user = resp.data.data.attributes;
        actions.addCurrentUser(user);
        apiUtils.api.defaults.headers = { 'Accept': 'application/json',
          'Content-Type': 'application/json', 'X-User-Email': user.email,
          'X-User-Token': user.authentication_token };
      }
    }).catch((error) => {
      if (payload.logIn) {
        actions.setLoginError(error.response.data.message);
      } else {
        actions.setSignUpError(error.response.data.message);
      }
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
