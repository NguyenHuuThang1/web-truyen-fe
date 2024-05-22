import axios from '../../../utils/axiosCustomize';

export const getUserList = async (query) => {
  return await axios.get(`/admin/list${query}`);
};

export const getUser = async (id) => {
  return await axios.get(`/admin/user-info/${id}`);
};
