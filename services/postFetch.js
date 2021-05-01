
import axios from 'axios';
import config from '../config'

export default async function fetchData(_body, path, token) {

    var response;

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    // Aqui agregar el email almacenado en el state al loguearse
    if (token) headers['X-User-Email'] = ''; headers['X-User-Token'] = token;
    try {
      await axios({
        method: 'post',
        url: `${config.api.host}/${path}`,
        data: { ..._body, code },
        headers: headers,
      })
        .then((resp) => {
            response = resp
        })
      return { status: response.status, body: response };
    } catch (err) {
      return { status: 500, body: 'Error' }
    }
}