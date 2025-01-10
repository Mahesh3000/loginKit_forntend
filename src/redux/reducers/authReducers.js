import { USER_DATA } from "../actions/actionTypes";

const initialState = {
  userData: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
