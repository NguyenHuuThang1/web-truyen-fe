import axios from '../../utils/axiosCustomize';

const getTopList = async (query) => {
  return await axios.get(`/api/novel${query}`);
};

export default getTopList;
