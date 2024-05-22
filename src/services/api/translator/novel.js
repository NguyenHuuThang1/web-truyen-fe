import axios from '../../../utils/axiosCustomize';
export const createNovel = async (
  name,
  description,
  author,
  categories,
  photo,
  coverImg
) => {
  const data = new FormData();
  data.append('name', name);
  data.append('description', description);
  if (author) data.append('author', author);
  if (categories) data.append('categories', categories);
  if (photo) data.append('photo', photo);
  if (coverImg) data.append('coverImg', coverImg);
  return await axios.post(`/api/novel`, data);
};

export const updateNovel = async (
  id,
  name,
  description,
  author,
  categories,
  photo,
  coverImg,
  status
) => {
  const data = new FormData();
  data.append('name', name);
  data.append('description', description);
  if (author) data.append('author', author);
  if (categories) data.append('categories', categories);
  if (photo) data.append('photo', photo);
  if (coverImg) data.append('coverImg', coverImg);
  if (status === 0) data.append('status', 'Chưa hoàn thành');
  if (status === 1) data.append('status', 'Hoàn thành');
  return await axios.patch(`/api/novel/${id}`, data);
};

export const getMyNovel = async () => {
  return await axios.get(`/api/novel/myNovel`);
};

export const deleteANovel = async (id) => {
  return await axios.delete(`/api/novel/${id}`);
};

export const endNovel = async (id) => {
  const data = { status: 'Hoàn thành' };
  return await axios.patch(`/api/novel/${id}`, data);
};

export const getNovelById = async (id) => {
  return await axios.get(`/api/novel/${id}`);
};
