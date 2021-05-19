import config from '../config';
import apiUtils from './api';

const sessionsApi = {
  login: (payload) => {
    const url = config.endpoints.users.logIn;

    return apiUtils.api({
      method: 'post',
      url,
      data: payload,
    });
  },
  signUp: (payload) => {
    const url = config.endpoints.users.createUser;

    return apiUtils.api({
      method: 'post',
      url,
      data: payload,
    });
  },
  getIngredients: (payload) => {
    const url = config.endpoints.ingredients.index;

    return apiUtils.api({
      method: 'get',
      url,
      data: payload,
    });
  },
  getRecipes: (payload) => {
    const url = config.endpoints.recipes.index;

    return apiUtils.api({
      method: 'get',
      url,
      data: payload,
    });
  },
  createIngredient: (payload) => {
    const url = config.endpoints.ingredients.index;

    return apiUtils.api({
      method: 'post',
      url,
      data: payload,
    });
  },
  editIngredient: (payload) => {
    const url = `${config.endpoints.ingredients.specific}${payload.id}`;

    return apiUtils.api({
      method: 'put',
      url,
      data: payload.body,
    });
  },
  deleteIngredient: (payload) => {
    const url = `${config.endpoints.ingredients.specific}${payload.id}`;

    return apiUtils.api({
      method: 'delete',
      url,
      data: null,
    });
  },
  deleteRecipe: (payload) => {
    const url = config.endpoints.recipes.specific + payload;

    return apiUtils.api({
      method: 'delete',
      url,
      data: null,
    });
  },
};
export default sessionsApi;

