import { LOADER, USER_DATA } from "./actionTypes";

// Action creators

export const setUserData = (userData) => ({
  type: USER_DATA,
  payload: userData,
});

export const setLoader = (loader) => ({
  type: LOADER,
  payload: loader,
});
