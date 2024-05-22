import { store } from '../../redux/store';
import axios from '../../utils/axiosCustomize';

const logout = async () => {
  const refreshToken = store?.getState()?.user?.account?.refresh_token;

  return await axios.post('/user/logout', { refreshToken });
};

export default logout;
