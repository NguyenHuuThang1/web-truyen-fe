import axios from '../../utils/axiosCustomize';

const register = async (
  firstName,
  lastName,
  username,
  email,
  password,
  passwordComfirm
) => {
  const data = {};
  data['firstName'] = firstName;
  data['lastName'] = lastName;
  data['username'] = username;
  data['email'] = email;
  data['password'] = password;
  data['passwordComfirm'] = passwordComfirm;

  return await axios.post('/auth/register', data);
};

export default register;
