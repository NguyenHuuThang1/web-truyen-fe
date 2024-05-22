import axios from '../../utils/axiosCustomize.js';

const toggleBookMark = async (id, isLove, chapter) => {
  const data = {};
  data['isLove'] = isLove;
  if (chapter) data['chapter'] = chapter;
  return axios.post(`/api/collection/${id}`, data);
};

export default toggleBookMark;
