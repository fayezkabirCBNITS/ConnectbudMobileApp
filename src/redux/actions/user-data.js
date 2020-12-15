import {
  UPDATE_CARD_TOKEN,
  UPDATE_USER_VERIFICATION_STATUS,
  UPDATE_USER_DETAILS,
  UPDATE_USER_PAYMENT_METHOD,
  STORE_ACCESS_TOKEN,
  LOGOUT,
  CHANGE_APP_OPEN_STATUS,
} from "./action-types";

export const updateCardToken = (cardToken) => {
  return {
    type: UPDATE_CARD_TOKEN,
    payload: {
      cardToken,
    },
  };
};

export const updateUserStatus = (isUserVerified) => {
  return {
    type: UPDATE_USER_VERIFICATION_STATUS,
    payload: {
      isUserVerified,
    },
  };
};

export const updateUserPaymentMethod = (paymentData) => {
  return {
    type: UPDATE_USER_PAYMENT_METHOD,
    payload: {
      paymentData,
    },
  };
};

export const updateUserDetails = (userData) => {
  return {
    type: UPDATE_USER_DETAILS,
    payload: {
      userData,
    },
  };
};

export const storeAccessToken = (token) => {
  return {
    type: STORE_ACCESS_TOKEN,
    payload: {
      token,
    },
  };
};

export const changeAppOpenStatus = (openAppFirstTime) => {
  return {
    type: CHANGE_APP_OPEN_STATUS,
    payload: {
      openAppFirstTime,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
