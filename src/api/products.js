import axios from 'axios';

export const getProducts = ({ offset = 0, limit = 20 } = {}) => {
  return axios.get('/products.json', { params: { offset, limit }});
};