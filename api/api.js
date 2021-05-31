import axios from 'axios';
import { HOST } from '@env';

console.log(HOST);
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
export default apiUtils;
