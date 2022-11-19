import { useEffect } from "react";
import { postGame, postLogin } from "../services";

import styles from "../styles/Home.module.css";

export default function Home() {
  function auth() {
    postLogin().then((res) => {
      const data = res?.data;
      if(!data) return;

      const access_token = data.access_token ?? '';
      localStorage.setItem('token', access_token);
      fetchGameData();
    });
  }

  function fetchGameData() {
    postGame().then((res) => {
      console.log("data", res.data);
    });
  }

  useEffect(() => {
    auth();
  }, []);

  return <div className={styles.container}></div>;
}
