import { decamelizeKeys } from 'humps';
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
    const url = config.endpoints.menus.new;

    return apiUtils.api({
      method: 'post',
      url,
      data: decamelizeKeys(payload),
    });
  },
  editMenu: (payload) => {
    const url = `${config.endpoints.menus.specific}${payload.id}`;

    return apiUtils.api({
      method: 'put',
      url,
      data: decamelizeKeys(payload.body),
    });
  },
};

export default menusApi;
