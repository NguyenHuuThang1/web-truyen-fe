import axios from '../../utils/axiosCustomize';

const upView = async (id) => {
  return await axios.patch(`/api/novel/chapter/${id}`);
};

export default upView;
