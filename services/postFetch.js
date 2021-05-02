
import axios from 'axios';
import { HOST } from '@env';
import { useStoreState } from 'easy-peasy';

export default async function fetchData(credentials) {
  axios.defaults.baseURL = HOST;

  let response;

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  // Aqui agregar el email almacenado en el state al loguearse
  if (credentials.token) {
    headers['X-User-Email'] = credentials._body.user.email;
    headers['X-User-Token'] = credentials.token;
  }
  try {
    await axios({
      method: 'post',
      url: `/${credentials.path}`,
      data: credentials._body,
      headers,
    })
      .then((resp) => {
        response = resp;
      });

    return { status: response.status, body: response.data.data };
  } catch (err) {
    return { body: 'API error' };
  }
}
