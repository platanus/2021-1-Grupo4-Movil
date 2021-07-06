import config from '../config';
import apiUtils from './api';

const ingredientsApi = {
  getIngredients: (payload) => {
    const url = config.endpoints.ingredients.index;

    return apiUtils.api({
      method: 'get',
      url,
      data: payload,
    });
  },
  getIngredient: (payload) => {
    const url = `${config.endpoints.ingredients.specific}${payload.id}`;

    return apiUtils.api({
      method: 'get',
      url,
      data: payload.body,
    });
  },
  getIngredientAssociations: (payload) => {
    const url = `${config.endpoints.ingredients.specific}${payload.id}/critical-associations`;

    return apiUtils.api({
      method: 'get',
      url,
      data: payload.body,
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
  searchCornerShop: (payload) => {
    const url = config.endpoints.ingredients.searchCornerShop;

    return apiUtils.api({
      method: 'get',
      url,
      params: {
        query: payload,
      },
    });
  },
  updateInventory: (payload) => {
    const url = config.endpoints.ingredients.updateInventory;

    return apiUtils.api({
      method: 'post',
      url,
      data: payload,
    });
  },
};
export default ingredientsApi;
