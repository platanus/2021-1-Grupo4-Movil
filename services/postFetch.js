
import axios from 'axios';
import { HOST } from "@env";

export default async function fetchData(_body, path, token) {

    axios.defaults.baseURL = HOST;

    var response;

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    // Aqui agregar el email almacenado en el state al loguearse
    if (token) { headers['X-User-Email'] = ''; headers['X-User-Token'] = token }
    try {
      await axios({
        method: 'post',
        url: `/${path}`,
        data: _body,
        headers: headers,
      })
        .then((resp) => {
            response = resp
        })
      return { status: response.status, body: response };
    } catch (err) {
      return { body: "API error" }
    }
}