import axios from '../../utils/axiosCustomize';

const deleteCollection = async (id) => {
  return await axios.delete(`/api/collection/${id}`);
};

export default deleteCollection;
