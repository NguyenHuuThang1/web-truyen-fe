import axios from '../../utils/axiosCustomize';

const getReviewList = async (id) => {
  return await axios.get(`/api/novel/${id}/review`);
};

export default getReviewList;
