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
  getMenu: (payload) => {
    const url = `${config.endpoints.menus.specific}${payload.id}`;

    return apiUtils.api({
      method: 'get',
      url,
      data: payload.body,
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
    const url = config.endpoints.menus.new;

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
  reduceInventory: (payload) => {
    const url = `${config.endpoints.menus.specific}${payload.id}/reduce-inventory`;

    return apiUtils.api({
      method: 'post',
      url,
    });
  },
  shoppingList: (payload) => {
    const url = `${config.endpoints.menus.specific}${payload.id}/shopping-list`;

    return apiUtils.api({
      method: 'get',
      url,
      data: payload.body,
    });
  },
};

export default menusApi;
