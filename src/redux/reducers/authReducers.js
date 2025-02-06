import { LOADER, USER_DATA } from "../actions/actionTypes";

const initialState = {
  userData: "",
  loader: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case LOADER:
      return {
        ...state,
        loader: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
