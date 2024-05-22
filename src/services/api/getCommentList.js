import axios from '../../utils/axiosCustomize';

const getCommentList = async (id) => {
  return await axios.get(`/api/comment/chapter/${id}`);
};

export default getCommentList;
