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
  createMenu: (payload) => {
    const url = config.endpoints.recipes.new;

    return apiUtils.api({
      method: 'post',
      url,
      data: payload,
    });
  },
  editMenu: (payload) => {
    const url = `${config.endpoints.menus.specific}${payload.id}`;

    return apiUtils.api({
      method: 'put',
      url,
      data: payload.body,
    });
  },
};

export default menusApi;
