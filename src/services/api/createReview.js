import axios from '../../utils/axiosCustomize';

const createReview = async (id, star, content) => {
  const data = {};
  data['content'] = content;
  data['rate'] = star;
  return await axios.post(`/api/novel/${id}/review`, data);
};

export default createReview;
