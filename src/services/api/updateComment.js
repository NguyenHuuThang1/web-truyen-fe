import axios from '../../utils/axiosCustomize';

const updateComment = async (id, content) => {
  const data = {};
  data['content'] = content;

  return await axios.patch(`/api/comment/${id}`, data);
};

export default updateComment;
