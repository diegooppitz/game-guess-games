import { postLogin } from "../services";
import '../styles/globals.css'



function MyApp({ Component, pageProps }) {
  // block duplicated requests
  let loaded = false;

  auth();
  return <Component {...pageProps} />

  function auth() {
    if(loaded) return;
    loaded = true;

    postLogin().then((res) => {
      const data = res?.data;
      if(!data) return;
  
      const access_token = data.access_token ?? '';
      localStorage.setItem('token', access_token);
    });
  }
}
export default MyApp
