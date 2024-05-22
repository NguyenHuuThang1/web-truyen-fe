import {
  FETCH_USER_LOGIN,
  UPDATE_ACCESS_TONKEN,
  USER_LOG_OUT,
  USER_UPDATE_INFO,
} from '../action/userAction';

const INITIAL_STATE = {
  account: {
    access_token: '',
    refresh_token: '',
    username: '',
    firstName: '',
    lastName: '',
    role: '',
    avatar: '',
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        account: {
          access_token: action?.payload?.data?.accessToken,
          refresh_token: action?.payload?.data?.refreshToken,
          username: action?.payload?.data?.username,
          firstName: action?.payload?.data?.firstName,
          lastName: action?.payload?.data?.lastName,
          role: action?.payload?.data?.role,
          avatar: action?.payload?.data?.avatar,
        },
        isAuthenticated: true,
      };
    case USER_LOG_OUT:
      return {
        ...state,
        account: {
          access_token: '',
          refresh_token: '',
          username: '',
          firstName: '',
          lastName: '',
          role: '',
          avatar: '',
        },
        isAuthenticated: false,
      };
    case USER_UPDATE_INFO:
      return {
        ...state,
        account: {
          ...state.account,
          firstName: action?.payload?.data?.user?.firstName,
          lastName: action?.payload?.data?.user?.lastName,
          avatar: action?.payload?.data?.user?.avatar,
        },
      };
    case UPDATE_ACCESS_TONKEN:
      return {
        ...state,
        account: {
          ...state.account,
          access_token: action?.payload?.accessToken,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
