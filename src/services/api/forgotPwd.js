import axios from '../../utils/axiosCustomize.js';

const forgotPwd = async (email) => {
  const data = {};
  data['email'] = email;
  return axios.post('/auth/forgot-password', data);
};

export default forgotPwd;
