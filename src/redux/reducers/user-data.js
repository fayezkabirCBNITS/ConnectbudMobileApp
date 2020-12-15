import {
  UPDATE_CARD_TOKEN,
  UPDATE_ORDER_ID,
  UPDATE_STORE_ID,
  STORE_ACCESS_TOKEN,
  UPDATE_USER_VERIFICATION_STATUS,
  UPDATE_USER_DETAILS,
  UPDATE_USER_PAYMENT_METHOD,
  CHANGE_APP_OPEN_STATUS,
  LOGOUT,
} from "../actions/action-types";

const initialState = {
  cardToken: null,
  status: "",
  isUserVerified: false,
  paymentMethod: {},
  isPaymentMethodAdded: false,
  email: "",
  deliveryAddress: "",
  accountStatus: "",
  accessToken: "",
  id: null,
  openAppFirstTime: true,
};

export const userDataReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case UPDATE_CARD_TOKEN: {
      newState.cardToken = action.payload.token;
      break;
    }
    case UPDATE_USER_VERIFICATION_STATUS: {
      newState.isUserVerified = action.payload.isUserVerified;
      break;
    }
    case STORE_ACCESS_TOKEN: {
      newState.accessToken = action.payload.token;
      break;
    }
    case UPDATE_USER_PAYMENT_METHOD: {
      newState.paymentMethod = action.payload.paymentData;
      newState.isPaymentMethodAdded = true;
      break;
    }
    case UPDATE_USER_DETAILS: {
      newState.email = action.payload.userData.hasOwnProperty("email")
        ? action.payload.userData.email
        : newState.email;

      newState.accountStatus = action.payload.userData.hasOwnProperty(
        "accountStatus"
      )
        ? action.payload.userData.accountStatus
        : newState.accountStatus;

      newState.id = action.payload.userData.hasOwnProperty("id")
        ? action.payload.userData.id
        : newState.id;

      newState.deliveryAddress = action.payload.userData.hasOwnProperty(
        "deliveryAddress"
      )
        ? action.payload.userData.deliveryAddress
        : newState.deliveryAddress;

      newState.isUserVerified = action.payload.userData.hasOwnProperty(
        "isUserVerified"
      )
        ? action.payload.userData.isUserVerified
        : action.payload.userData.hasOwnProperty("accountStatus") &&
          action.payload.userData.accountStatus ===
            "EMAIL_VERIFICATION_COMPLETED"
        ? true
        : newState.isUserVerified;
      break;
    }
    case CHANGE_APP_OPEN_STATUS: {
      newState.openAppFirstTime = action.payload.openAppFirstTime;
      break;
    }
    case LOGOUT: {
      newState = initialState;
      break;
    }

    default: {
      break;
    }
  }
  return newState;
};
