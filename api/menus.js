import config from '../config';
import apiUtils from './api';

const menusApi = {
  getMenus: (payload) => {
    const url = config.endpoints.menus.index;

    return apiUtils.api({
      method: 'get',
      url,
      data: payload,
    });
  },
  deleteMenu: (payload) => {
    const url = config.endpoints.menus.specific + payload;

    return apiUtils.api({
      method: 'delete',
      url,
      data: null,
    });
  },
};

export default menusApi;
