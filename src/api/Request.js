import { merge } from "lodash";
import axios from "axios";

export const Request = async (
    url = '',
    method = 'GET',
    data = {},
    aditionalHeaders = {}
) => {
    let defaultConfig = {
        headers: {
            Accept: "application/json",
            // "Content-Type": 'application/json'
        }
    };

    const params = {
        url,
        method,
        data,
        headers: aditionalHeaders
    }

    const fullConfig = merge(defaultConfig, params);

    return axios.request(fullConfig)
        .then(r => {
            return r;
        })
        .catch(err =>{
            throw err;
        })


}