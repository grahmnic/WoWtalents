import { useEffect, useState } from 'react'
import '../styles/globals.css';
import APIClient from '../helpers/apiClient';
import { wrapper } from '../redux/store';
import config from '../config';
import axios from 'axios';
import { auth_load, get_cookies } from '../redux/reducers/auth';
import { useDispatch } from 'react-redux';

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  // wait until css loads from build
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await APIClient('get', `${config.apiHost}csrf`)
      axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
    };

    setMounted(true);
    getCsrfToken().then(() => {
      dispatch(get_cookies());
    });
  }, []);

  return (
    <div style={{
      visibility: !mounted ? 'hidden' : 'visible'
    }}>
      <Component {...pageProps} />
    </div>);
}

export default wrapper.withRedux(MyApp);
