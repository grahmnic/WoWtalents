import axios , { AxiosRequestConfig } from 'axios'
import cookies from 'js-cookie'

export default async function APIClient(method, url, params?, data?, headers?, files?, fields? ) {

  let request: AxiosRequestConfig = {
    withCredentials: true,
    url: url,
    method: method
  };

  if (params) {
    request.params = params;
  }

  if (headers) {
    request.headers = headers;
  }

  const cookie = cookies.get('t');

  if (cookie) {
    request.headers = {
      Authorization: `Bearer ${cookie}`,
    };
  }

  if (data) {
    request.data = data;
  }

  return await axios.request(request);
}