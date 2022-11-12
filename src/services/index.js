import axios from "axios";

const url = 'https://id.twitch.tv/';

export const postLogin = () => {
  return axios.post(`${url}token`, {
    client_id: '4cgbcs05x1m2sh7m9pdskymo9kcbv1',
    client_secret: 'pxbrr90w0hjy7ggdotdo3hw8qu2w9d',
    grant_type: 'client_credentials',
  })
}