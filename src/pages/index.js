import React, { useEffect, useState } from "react";
import { postGame, postLogin } from "../services";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [imageURL, setImageURL] = useState('')

  // block duplicated requests
  let loadedToken = false;
  let loaded = false;

  function auth() {
    if(loadedToken) return;
    loadedToken = true;

    postLogin().then((res) => {
      const data = res?.data;
      if(!data) return;

      const access_token = data.access_token ?? '';
      localStorage.setItem('token', access_token);
      fetchGameData();
    });
  }

  function fetchGameData() {
    if(loaded) return;
    loaded = true;
    postGame().then(({ data }) => {
      let url = data[0]?.artworks[0]?.url;
      if (!url) return;

      url = url.replace('t_thumb', 't_720p');
      url = `https:${url}`
      setImageURL(url);
    });
  }

  useEffect(() => {
    auth();
  }, []);


  useEffect(() => {
    console.log("aqui", imageURL)
  }, [imageURL]);

  return <div className={styles.container}>
    <h1 className={styles.title}>Guess game</h1>
    <img className={styles.gameImg} src={imageURL} />
    <div className={styles.guessOptions}>
      <input className={styles.guessInput} placeholder="Find out name of the game" />
      <button className={styles.guessBtn}>Submit</button>
    </div>
  </div>;
}
