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
      'X-User-Email': 'test@mobile.com',
      'X-User-Token': 'Fh6SxANpf8sC7VGa2W2B' },
  }),
};
export default apiUtils;
