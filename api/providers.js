import config from '../config';
import apiUtils from './api';

const providersApi = {
  getProviders: (payload) => {
    const url = config.endpoints.providers.index;

    return apiUtils.api({
      method: 'get',
      url,
      data: payload,
    });
  },
  createProvider: (payload) => {
    const url = config.endpoints.providers.index;

    return apiUtils.api({
      method: 'post',
      url,
      data: payload,
    });
  },
};
export default providersApi;