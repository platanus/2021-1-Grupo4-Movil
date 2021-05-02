import axios from 'axios';
import { HOST } from '@env';
import { useStoreState } from 'easy-peasy';

export default async function fetchData(path, params) {
  const user = useStoreState((state) => state.user);
  axios.defaults.baseURL = HOST;

  let response;

  function extractParams(params) {
    let paramsStr = '?';
    Object.entries(params).forEach(([key, value]) => {
      paramsStr += `${key}=${value}&`;
    });
    paramsStr = paramsStr.slice(0, -1);
    console.log('New params', paramsStr);

    return paramsStr;
  }

  let url = `/${path}`;
  url += params ? extractParams(params) : '';

  await axios(url).then((resp) => { response = resp; });

  return { status: response.status, body: response };
}
