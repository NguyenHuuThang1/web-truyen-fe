import axios from '../../utils/axiosCustomize';

const createComment = async (id, content) => {
  const data = {};
  data['content'] = content;
  return await axios.post(`/api/comment/chapter/${id}`, data);
};

export default createComment;
