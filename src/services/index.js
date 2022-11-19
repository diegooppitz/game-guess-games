import axios from "axios";

const urlToken = 'https://id.twitch.tv/oauth2/token';

export const postLogin = () => {
  return axios.post(`${urlToken}`, {
    client_id: '4cgbcs05x1m2sh7m9pdskymo9kcbv1',
    client_secret: 'pxbrr90w0hjy7ggdotdo3hw8qu2w9d',
    grant_type: 'client_credentials',
  })
}

export const postGame = () => {
  const token = localStorage.getItem('token');
  const url = "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/";

  return axios.post(
    url,
    "fields *;", {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-Id': '4cgbcs05x1m2sh7m9pdskymo9kcbv1',
      },
    }
  );
}