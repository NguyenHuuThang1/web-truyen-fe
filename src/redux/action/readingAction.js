export const CHANGE_THEME_SETTING = 'CHANGE_THEME_SETTING';
export const CHANGE_FONT_SETTING = 'CHANGE_FONT_SETTING';
export const CHANGE_SIZE_SETTING = 'CHANGE_SIZE_SETTING';
export const changeThemeSetting = (data) => {
  return {
    type: CHANGE_THEME_SETTING,
    payload: data,
  };
};
export const changeFontSetting = (data) => {
  return {
    type: CHANGE_FONT_SETTING,
    payload: data,
  };
};
export const changeSizeSetting = (data) => {
  return {
    type: CHANGE_SIZE_SETTING,
    payload: data,
  };
};
