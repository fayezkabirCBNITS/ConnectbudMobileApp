import {
  UPDATE_USER_DETAILS,
  UPDATE_USER_JOBID,
  UPDATE_VIEWPROFILE,
  LOGOUT,
  UPDATE_SLUG,
  UPDATE_POSTJOB,

  // UPDATE_CARD_TOKEN,
  // UPDATE_USER_VERIFICATION_STATUS,
  // UPDATE_USER_PAYMENT_METHOD,
  // STORE_ACCESS_TOKEN,
   CHANGE_APP_OPEN_STATUS,
} from "./action-types";

// export const updateJobId = (id) => {
//   return {
//     type: UPDATE_JOB_ID,
//     payload: {
//       id,
//     },
//   };
// };

// export const updateUserStatus = (isUserVerified) => {
//   return {
//     type: UPDATE_USER_VERIFICATION_STATUS,
//     payload: {
//       isUserVerified,
//     },
//   };
// };

// export const updateUserPaymentMethod = (paymentData) => {
//   return {
//     type: UPDATE_USER_PAYMENT_METHOD,
//     payload: {
//       paymentData,
//     },
//   };
// };



// export const storeAccessToken = (token) => {
//   return {
//     type: STORE_ACCESS_TOKEN,
//     payload: {
//       token,
//     },
//   };
// };

export const changeAppOpenStatus = (openAppFirstTime) => {
  return {
    type: CHANGE_APP_OPEN_STATUS,
    payload: {
      openAppFirstTime,
    },
  };
};
export const updateUserDetails = (userData, user_id, Flag) => {
  return {
    type: UPDATE_USER_DETAILS,
    payload: {
      userData,
      user_id,
      Flag
    },
  };
};

//update slug on profile edit

export const updateslug = (slugName) => {
  return {
    type: UPDATE_SLUG,
    payload: {
      slugName,
    },
  };
};
export const updateTmpPostJob = (jobData) => {
  return {
    type: UPDATE_POSTJOB,
    payload: {
      jobData,
    },
  };
};

//update job id
export const updateJobId = (jobId) => {
  return {
    type: UPDATE_USER_JOBID,
    payload: {
      jobId,
    },
  };
};

//update landing viewprofile data
export const updateViewProfile = (slug, user_id) => {
  return {
    type: UPDATE_VIEWPROFILE,
    payload: {
      slug,
      user_id
    },
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
