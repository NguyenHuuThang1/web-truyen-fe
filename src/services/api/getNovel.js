import axios from '../../utils/axiosCustomize';

const getNovel = async (query) => {
  return await axios.get(`/api/novel${query}`);
};

export default getNovel;
