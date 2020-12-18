import { store } from "../../redux/store";

/**
 *
 * Checks for auth token in auth state & storage
 *
 */
export const getToken = () => {
  return new Promise((resolve, reject) => {
    let token = null;
    const oldState = store.getState();
    const state = { ...oldState };
    // Try to get token from state
    if (
      state &&
      state.userData &&
      state.userData.Token &&
      state.userData.Token.length
    ) {
      token = state.userData.Token;
    }
    resolve(token);
  });
};
