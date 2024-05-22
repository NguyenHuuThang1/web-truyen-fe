import axios from '../../utils/axiosCustomize';

const getLoveList = async (query) => {
  return await axios.get(`/api/collection/love${query}`);
};

export default getLoveList;
