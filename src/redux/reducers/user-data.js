import {
  // UPDATE_CARD_TOKEN,
  // UPDATE_ORDER_ID,
  // UPDATE_STORE_ID,
  // STORE_ACCESS_TOKEN,
  // UPDATE_USER_VERIFICATION_STATUS,
  // UPDATE_USER_PAYMENT_METHOD,
  // CHANGE_APP_OPEN_STATUS,
  UPDATE_USER_DETAILS,
  UPDATE_USER_JOBID,
  UPDATE_VIEWPROFILE,
  LOGOUT,
} from '../actions/action-types';

const initialState = {
  // cardToken: null,
  // status: "",
  // isUserVerified: false,
  // paymentMethod: {},
  // isPaymentMethodAdded: false,
  // email: "",
  // deliveryAddress: "",
  // accountStatus: "",
  // accessToken: "",
  // id: null,
  // openAppFirstTime: true,

  Flag: '',
  Status: '',
  Token: '',
  expert_type: '',
  freeclass_available: '',
  name: '',
  paymentStatus: '',
  row_id: null,
  slug: '',
  user_id: '',
  userDetails: [],
  JOBID: '',
  slugname: '',
  view_user_id: ''
};

export const userDataReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case UPDATE_USER_JOBID: {
      newState.JOBID = action.payload.jobId;
      break;
    }
    case UPDATE_VIEWPROFILE: {
      newState.slugname = action.payload.slug;
      newState.view_user_id = action.payload.user_id;
      break;
    }
    // case UPDATE_USER_VERIFICATION_STATUS: {
    //   newState.isUserVerified = action.payload.isUserVerified;
    //   break;
    // }
    // case STORE_ACCESS_TOKEN: {
    //   newState.accessToken = action.payload.token;
    //   break;
    // }
    // case UPDATE_USER_PAYMENT_METHOD: {
    //   newState.paymentMethod = action.payload.paymentData;
    //   newState.isPaymentMethodAdded = true;
    //   break;
    // }
    // case CHANGE_APP_OPEN_STATUS: {
    //   newState.openAppFirstTime = action.payload.openAppFirstTime;
    //   break;
    // }

    case UPDATE_USER_DETAILS: {
      newState.userDetails = action.payload.userData
        ? action.payload.userData
        : newState.userDetails;
      newState.Flag = action.payload.userData[0].Flag
        ? action.payload.userData[0].Flag
        : newState.Flag;

      newState.Status = action.payload.userData[0].Status
        ? action.payload.userData[0].Status
        : newState.Status;

      newState.Token = action.payload.userData[0].Token
        ? action.payload.userData[0].Token
        : newState.Token;

      newState.expert_type = action.payload.userData[0].expert_type

        ? action.payload.userData[0].expert_type
        : newState.expert_type;

      newState.freeclass_available = action.payload.userData[0].freeclass_available
        ? action.payload.userData[0].freeclass_available
        : newState.freeclass_available;

      newState.name = action.payload.userData[0].name
        ? action.payload.userData[0].name
        : newState.name;

      newState.paymentStatus = action.payload.userData[0].paymentStatus
        ? action.payload.userData[0].paymentStatus
        : newState.paymentStatus;

      newState.row_id = action.payload.userData[0].row_id
        ? action.payload.userData[0].row_id
        : newState.row_id;

      newState.slug = action.payload.userData[0].slug
        ? action.payload.userData[0].slug
        : newState.slug;

      newState.user_id = action.payload.userData[0].user_id
        ? action.payload.userData[0].user_id
        : newState.user_id;

      // newState.isUserVerified = action.payload.userData.hasOwnProperty(
      //   "isUserVerified"
      // )
      //   ? action.payload.userData.isUserVerified
      //   : action.payload.userData.hasOwnProperty("accountStatus") &&
      //     action.payload.userData.accountStatus ===
      //       "EMAIL_VERIFICATION_COMPLETED"
      //   ? true
      //   : newState.isUserVerified;
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
