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
    const url = config.endpoints.providers.new;

    return apiUtils.api({
      method: 'post',
      url,
      data: payload,
    });
  },
  deleteProvider: (payload) => {
    const url = `${config.endpoints.providers.specific}${payload.id}`;

    return apiUtils.api({
      method: 'delete',
      url,
      data: null,
    });
  },
  editProvider: (payload) => {
    const url = `${config.endpoints.providers.specific}${payload.id}`;

    return apiUtils.api({
      method: 'put',
      url,
      data: payload.body,
    });
  },
};
export default providersApi;
