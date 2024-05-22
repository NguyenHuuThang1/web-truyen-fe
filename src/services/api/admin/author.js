import axios from '../../../utils/axiosCustomize';

export const getAuthor = async (query) => {
  return await axios.get(`/api/author/${query}`);
};

export const getAuthorById = async (id) => {
  return await axios.get(`/api/author/${id}`);
};

export const updateAuthor = async (id, name, description, birthday) => {
  const data = {};
  if (name) data['name'] = name;
  if (description) data['description'] = description;
  if (birthday) data['birthday'] = birthday;
  return await axios.patch(`/api/author/${id}`, data);
};

export const createAuthor = async (name, description, birthday) => {
  const data = {};
  if (name) data['name'] = name;
  if (description) data['description'] = description;
  if (birthday) data['birthday'] = birthday;
  return await axios.post(`/api/author/`, data);
};

export const getAllAuthor = async () => {
  return await axios.get('/api/author/all');
};
