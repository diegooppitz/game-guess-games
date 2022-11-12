import { useEffect } from "react";
import { postLogin } from "../services";
import styles from "../styles/Home.module.css";

export default function Home() {
  useEffect(() => {
    postLogin().then((res) => {
      console.log(res);
    });
  }, []);

  return <div className={styles.container}></div>;
}
