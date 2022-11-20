import axios from "axios";

const urlToken = 'https://id.twitch.tv/oauth2/token';
const client_id = 's226f5b3s3lrpz4gwuzp0lx7k58x6d';
const client_secret = '0siale2wg1oax0l8qhyiizz4dokqaw';

export const postLogin = () => {
  return axios.post(`${urlToken}`, {
    client_id,
    client_secret,
    grant_type: 'client_credentials',
  })
}


export const postGame = () => {
  const token = localStorage.getItem('token');
  const url = "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/";
  const fields = "fields artworks.*; where id = 434;"

  return axios.post(
    url,
    fields, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-Id': client_id,
      },
    }
  );
}