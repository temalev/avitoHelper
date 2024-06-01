import axios from 'axios'
// import { stringify } from 'query-string';

// create an axios instance
const service = axios.create({
  baseURL: 'https://api.avigroup.site/api/client',
  // baseURL:`${process.env.VUE_APP_BASE_API}/`, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

service.defaults.timeout = 0;

// service.defaults.paramsSerializer = params => stringify(params, {
//   encode: true,
//   arrayFormat: 'none',
//   skipNull: true,
//   skipEmptyString: true,
// });

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (!response) {
      console.error({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      });
    } else {
      return res;
    }

  },
  error => {
    console.error('err', error); // for debug
    console.error('err', error.response); // for debug

    if (error.response?.status === 401 || error.response?.status === 403) {
      window.location.href = '/login'
    }
    if (error.response?.status >= 400) {
      alert(error.response.data) 
    }

    return Promise.reject(error)
  }
)

export default service;
