export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const USER_LOG_OUT = 'USER_LOG_OUT';
export const USER_UPDATE_INFO = 'USER_UPDATE_INFO';
export const UPDATE_ACCESS_TONKEN = 'UPDATE_ACCESS_TONKEN';
export const doLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN,
    payload: data,
  };
};

export const doLogout = () => {
  return {
    type: USER_LOG_OUT,
    payload: {},
  };
};

export const updateInfo = (data) => {
  return {
    type: USER_UPDATE_INFO,
    payload: data,
  };
};

export const updateAT = (data) => {
  return {
    type: UPDATE_ACCESS_TONKEN,
    payload: data,
  };
};
