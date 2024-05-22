import axios from '../../../utils/axiosCustomize';

export const deleteUser = async (id) => {
  return await axios.delete(`/admin/delete${id}`);
};
