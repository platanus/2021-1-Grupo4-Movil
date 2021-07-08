import config from '../config';
import apiUtils from './api';

const recipesApi = {
  getRecipes: (payload) => {
    const url = config.endpoints.recipes.index;

    return apiUtils.api({
      method: 'get',
      url,
      data: payload,
    });
  },
  getRecipe: (payload) => {
    const url = `${config.endpoints.recipes.specific}${payload.id}`;

    return apiUtils.api({
      method: 'get',
      url,
      data: payload.body,
    });
  },
  createRecipe: (payload) => {
    const url = config.endpoints.recipes.new;

    return apiUtils.api({
      method: 'post',
      url,
      data: payload,
    });
  },
  editRecipe: (payload) => {
    const url = `${config.endpoints.recipes.specific}${payload.id}`;

    return apiUtils.api({
      method: 'put',
      url,
      data: payload.body,
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
  getRecipeAssociations: (payload) => {
    const url = `${config.endpoints.recipes.specific}${payload.id}/critical-associations`;

    return apiUtils.api({
      method: 'get',
      url,
      data: null,
    });
  },
  createRecipeStep: (payload) => {
    const url = `${config.endpoints.recipes.specific}${payload.id}/${config.endpoints.recipes.steps}`;

    return apiUtils.api({
      method: 'post',
      url,
      data: payload.body,
    });
  },
  editRecipeStep: (pay) => {
    const url = `${config.endpoints.recipes.specific}${pay.recipeId}/${config.endpoints.recipes.steps}/${pay.stepId}`;

    return apiUtils.api({
      method: 'put',
      url,
      data: pay.body,
    });
  },
  deleteRecipeStep: (pay) => {
    const url = `${config.endpoints.recipes.specific}${pay.recipeId}/${config.endpoints.recipes.steps}/${pay.stepId}`;

    return apiUtils.api({
      method: 'delete',
      url,
      data: null,
    });
  },
};

export default recipesApi;
