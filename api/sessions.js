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
};
export default sessionsApi;

