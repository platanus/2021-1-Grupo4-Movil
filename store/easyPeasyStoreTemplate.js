import { createStore, action, thunk, computed } from 'easy-peasy';
import fetchData from '../services/postFetch';

const storeState = {
  currentUser: null,
  loginError: '',
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
};

const storeThunks = {
  sendCredentials: thunk(async (actions, payload) => {
    const response = await fetchData(payload);
    if (response.status == 200 || response.status == 201) {
      actions.addCurrentUser(response.body.attributes);
    } else {
      actions.setLoginError(response.body);
    }
  }),
};

const generateStore = createStore({
  ...storeState,
  ...getters,
  ...storeActions,
  ...storeThunks,
});

export default generateStore;
