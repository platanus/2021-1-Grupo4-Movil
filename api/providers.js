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
  deleteProvider: (payload) => {
    const url = `${config.endpoints.providers.specific}${payload.id}`;

    return apiUtils.api({
      method: 'delete',
      url,
      data: null,
    });
  },
};
export default providersApi;
