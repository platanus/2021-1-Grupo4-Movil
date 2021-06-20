import { decamelizeKeys } from 'humps';
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
  createIngredient: (payload) => {
    const url = config.endpoints.ingredients.index;

    return apiUtils.api({
      method: 'post',
      url,
      data: decamelizeKeys(payload),
    });
  },
  editIngredient: (payload) => {
    const url = `${config.endpoints.ingredients.specific}${payload.id}`;

    return apiUtils.api({
      method: 'put',
      url,
      data: decamelizeKeys(payload.body),
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
};
export default ingredientsApi;
