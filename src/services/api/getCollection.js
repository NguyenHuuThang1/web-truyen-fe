import axios from '../../utils/axiosCustomize';

const getCollection = async (query) => {
  return await axios.get(`/api/collection/history${query}`);
};

export default getCollection;
