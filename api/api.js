import axios from 'axios';
import { HOST } from '@env';

const apiUtils = {
  statusCodes: {
    ok: 200,
    created: 201,
  },

  api: axios.create({
    baseURL: HOST,
    timeout: 10000,
    headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-User-Email': 'trini@gmail.com',
      'X-User-Token': 'fiMubz_w9HNgHcGNisHd' },
  }),
};
export default apiUtils;
