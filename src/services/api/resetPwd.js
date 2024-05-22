import axios from '../../utils/axiosCustomize.js';

const resetPwd = async (code, password, passwordComfirm) => {
  const data = {};
  data['otp'] = code;
  data['newPassword'] = password;
  data['confirmPassword'] = passwordComfirm;
  return axios.post('/auth/reset-password', data);
};

export default resetPwd;
