import axios from '../../utils/axiosCustomize.js';

const changePwd = async (cPwd, nPwd) => {
  const data = {};
  data['currentPassword'] = cPwd;
  data['newPassword'] = nPwd;
  return axios.post('/user/change-password', data);
};

export default changePwd;
