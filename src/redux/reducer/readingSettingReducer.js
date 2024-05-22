import {
  CHANGE_FONT_SETTING,
  CHANGE_SIZE_SETTING,
  CHANGE_THEME_SETTING,
} from '../action/readingAction';

const INITIAL_STATE = {
  theme: 'light',
  font: 'sans',
  size: 'sm',
};
const readingSettingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_THEME_SETTING:
      return {
        ...state,
        theme: action?.payload?.theme,
      };
    case CHANGE_FONT_SETTING:
      return {
        ...state,
        font: action?.payload?.font,
      };
    case CHANGE_SIZE_SETTING:
      return {
        ...state,
        size: action?.payload?.size,
      };
    default:
      return state;
  }
};

export default readingSettingReducer;
