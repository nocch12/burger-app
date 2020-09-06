import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-ccd4c.firebaseio.com/'
});

export default instance;