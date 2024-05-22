import axios from '../../utils/axiosCustomize';

const deleteComment = async (id) => {
  return await axios.delete(`/api/comment/${id}`);
};

export default deleteComment;
