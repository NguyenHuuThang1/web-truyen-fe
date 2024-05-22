import axios from '../../utils/axiosCustomize';

const getAuthor = async (id) => {
  return await axios.get(`/api/author/${id}`);
};

export default getAuthor;
