import { createStore, action, thunk, persist, computed } from 'easy-peasy';

const storeState = (name) => (persist({
  user: name,
}));

const getters = {
  enabledAndHistoricalBankAccounts: computed(state => (
    state.bankAccounts.filter((bankAccount => bankAccount.active && bankAccount.withMatches))
  )),
};

const storeActions = {
  setName: action((state, payload) => {
    state.user = payload;
  }),
};

const storeThunks = {
  getSomething: thunk(async (actions, payload) => {
    const response = await api.getData(payload);
    const data = response.data;
    actions.setName(data);

    // return opcional
  }),
};

const generateStore = (name) => createStore({
  ...storeState(name),
  ...getters,
  ...storeActions,
  ...storeThunks,
});

export default generateStore;
