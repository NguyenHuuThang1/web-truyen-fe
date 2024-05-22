import axios from '../../utils/axiosCustomize';

const updateMe = async (firstName, lastName, avatar) => {
  const data = new FormData();
  data.append('firstName', firstName);
  data.append('lastName', lastName);
  if (avatar) data.append('avatar', avatar);
  return await axios.post('/user/update', data);
};

export default updateMe;
