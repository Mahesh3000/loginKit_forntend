import { USER_DATA } from "./actionTypes";

// Action creators

export const setUserData = (userData) => ({
  type: USER_DATA,
  payload: userData,
});
