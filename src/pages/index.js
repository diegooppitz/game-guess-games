import React, { useEffect, useState } from "react";
import { postGame, postLogin, postSearchGame } from "../services";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [imageURL, setImageURL] = useState('');

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState();
  
  const [blurValue, setBlurValue] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);


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

  function searchGame() {
    postSearchGame(searchValue).then(({ data }) => {
      setBlurValue(blurValue + 1);
      if(!data || data.length === 0) return;
      console.log(data);

      setSearchResults(data);
      console.log("aqui")
      setShowSuggestions(true);
    })
  }

  function changeGuessInput(e) {
    const val = e?.target?.value;
    if(val) setSearchValue(val)
  }

  function checkBlur() {
    if (blurValue === 0) return styles.blurredImg7;
    else if (blurValue === 1) return styles.blurredImg5;
    else if (blurValue === 2) return styles.blurredImg3;
    else return null;
  }


  useEffect(() => {
    auth();
  }, []);

  return <div className={styles.container}>
    <h1 className={styles.title}>Guess game</h1>
    <img className={`${styles.gameImg} ${checkBlur()}`} src={imageURL} />
    <div className={styles.guessOptions}>
      <input className={styles.guessInput} onChange={changeGuessInput} placeholder="Find out name of the game" />
      <button onClick={searchGame} className={styles.guessBtn}>Search</button>

      {showSuggestions && (
        <div className={styles.guessSuggestions}>
          {searchResults.map((item) => (
            <div key={item.id} className={styles.suggestionItem}>{item.name}</div>
          ))}
        </div>
       )}
    </div>
  </div>;
}
