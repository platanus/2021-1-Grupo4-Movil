import config from '../config';
import apiUtils from './api';

const recipesApi = {
  get: (payload) => {
    const url = config.endpoints.recipes.index;

    return apiUtils.api({
      method: 'get',
      url,
      data: payload,
    });
  },
};
export default recipesApi;

