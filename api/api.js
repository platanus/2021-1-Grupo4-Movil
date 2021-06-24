import axios from 'axios';
import { HOST } from '@env';
import { camelizeKeys, decamelizeKeys } from 'humps';

const apiUtils = {
  statusCodes: {
    ok: 200,
    created: 201,
  },

  api: axios.create({
    baseURL: HOST,
    timeout: 10000,
    headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
  }),
};

apiUtils.api.interceptors.response.use(
  response => {
    if (response.data && response.headers['content-type'].match('application/json')) {
      response.data = camelizeKeys(response.data);
    }

    return response;
  });

apiUtils.api.interceptors.request.use(config => {
  const newConfig = { ...config };
  if (config.params) {
    newConfig.params = decamelizeKeys(config.params);
  }
  if (config.data) {
    newConfig.data = decamelizeKeys(config.data);
  }

  return newConfig;
});

export default apiUtils;
