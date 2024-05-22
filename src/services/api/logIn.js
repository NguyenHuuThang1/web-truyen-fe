import axios from '../../utils/axiosCustomize';

const logIn =  async (username, pwd) => {
  const data = {};
  data['username'] = username;
  data['password'] = pwd;

  return await axios.post('/auth/login', data);
};

export default logIn;