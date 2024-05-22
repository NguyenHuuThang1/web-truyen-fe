import axios from '../../../utils/axiosCustomize';
export const createChapter = async (id, name, content) => {
  const data = {};
  data['name'] = name;
  data['content'] = content;
  return await axios.post(`/api/novel/${id}`, data);
};

export const updateChapter = async (nId, cId, name, content) => {
  const data = {};
  data['name'] = name;
  data['content'] = content;
  return await axios.patch(`/api/novel/${nId}/${cId}`, data);
};

export const getChapterByID = async (cId) => {
  return await axios.get(`/api/novel/chapter/` + cId);
};
