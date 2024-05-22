import axios from '../../utils/axiosCustomize';

const updateReview = async (novelId, id, score, content) => {
  const data = {};
  data['content'] = content;
  data['rate'] = score;

  return await axios.patch(`/api/novel/${novelId}/review/${id}`, data);
};

export default updateReview;
