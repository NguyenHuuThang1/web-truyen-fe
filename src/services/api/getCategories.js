import axios from '../../utils/axiosCustomize';

const getCategories = async () => {
  return await axios.get(`/api/category`);
};

export default getCategories;
