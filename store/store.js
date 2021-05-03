import { createStore, action, thunk, computed } from 'easy-peasy';
import config from '../config';
import apiUtils from '../api/api';

const storeState = {
  currentUser: null,
  loginError: '',
  signUpError: '',
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
          'Content-Type': 'application/json', 'X-User-Mail': user.email,
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
};

const generateStore = createStore({
  ...storeState,
  ...getters,
  ...storeActions,
  ...storeThunks,
});

export default generateStore;
