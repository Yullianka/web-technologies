import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchItems = (query, model, sortOrder) => {
  const params = new URLSearchParams();

  if (query) params.append('searchQuery', query); 
  if (model !== 'all') params.append('selectedModel', model); 
  params.append('sortOrder', sortOrder);

  return axios.get(`${API_BASE_URL}/iphones`, { params });
};
