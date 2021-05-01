import axios from 'axios';
import { HOST } from "@env";

export default async function fetchData(path, params) {

    axios.defaults.baseURL = HOST;

    var response;

    function extractParams(params) {
        let paramsStr = '?'
        Object.entries(params).forEach(([key, value]) => {
            paramsStr += `${key}=${value}&`
        })
        paramsStr = paramsStr.slice(0, -1)
        console.log('New params', paramsStr)
        return paramsStr
    }

    let url = `/${path}`
    url += params ? extractParams(params) : ''

    await axios(url).then((resp) => { response = resp })

    return { status: response.status, body: response };

}