import axios from '../../utils/axiosCustomize';

const getMarkBook = async (id) => {
  return await axios.get(`/api/collection/${id}`);
};

export default getMarkBook;
