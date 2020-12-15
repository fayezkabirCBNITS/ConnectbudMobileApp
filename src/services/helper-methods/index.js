import {store} from '../../redux/store';
import Toast from 'react-native-toast-message';
import {logout} from '../../redux/actions/user-data';
// import jwt_decode from "jwt-decode";
// import { PermissionsAndroid, Platform } from "react-native";
// import Geolocation from "@react-native-community/geolocation";
// import RNAndroidLocationEnabler from "react-native-android-location-enabler";

export const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data));
};

export const goBack = (props) => {
  props.navigation.goBack(null);
};

export const isSVG = (link) => {
  const splittedLinks = link.split('.');
  if (
    splittedLinks &&
    splittedLinks.length &&
    splittedLinks[splittedLinks.length - 1] === 'svg'
  ) {
    return true;
  }
  return false;
};

export const convertIntoDisplayNumberFormat = (value) => {
  if (value) {
    return Number(value).toFixed(2);
  }
  return '0.00';
};

export const showToast = (
  message = 'Nework Problem',
  type = 'error',
  header = null,
  duration = 1000,
  onShowCallBack = () => {},
  onHideCallBack = () => {},
) => {
  Toast.show({
    type,
    position: 'top',
    text1: message,
    visibilityTime: duration,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
    onShow: onShowCallBack,
    onHide: onHideCallBack,
  });
};

export const hideToast = (onHideCallBack = () => {}) => {
  Toast.hide({
    onHide: onHideCallBack,
  });
};

export const decodeToken = (token) => {
  // return jwt_decode(token);
};

// export const handleLocation = async () => {
//   return new Promise(async (resolve) => {
//     console.log("Platform.OS :>> ", Platform.OS);
//     if (Platform.OS === "ios") {
//       try {
//         const permission = await Geolocation.requestAuthorization();
//         console.log(
//           "🚀 ~ file: index.js ~ line 192 ~ returnnewPromise ~ permission",
//           permission
//         );
//         if (permission === PermissionsAndroid.RESULTS.GRANTED) {
//           // return location object
//           const location = await returnCurrentLocation();
//           console.log(
//             "🚀 ~ file: index.js ~ line 200 ~ returnnewPromise ~ location",
//             location
//           );
//           resolve(location);
//         } else {
//           // enableLocation();
//           resolve(null);
//         }
//       } catch (error) {
//         // enableLocation();
//         resolve(null);
//       }
//     } else {
//       try {
//         const granted = PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: "Location Permission",
//             message:
//               "This App needs access to your location " +
//               "so we can know where you are.",
//           }
//         );
//         console.log(
//           "handleLocation permission:>> ",
//           permission,
//           PermissionsAndroid.RESULTS.GRANTED
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log("You can use locations ", permission);
//           // return location object
//           const location = await returnCurrentLocation();
//           console.log(
//             "🚀 ~ file: index.js ~ line 230 ~ returnnewPromise ~ location",
//             location
//           );
//           resolve(location);
//         } else {
//           const location = await returnCurrentLocation();
//           console.log(
//             "🚀 ~ file: index.js ~ line 230 ~ returnnewPromise ~ location",
//             location
//           );
//           resolve(location);
//         }
//       } catch (err) {
//         const location = await returnCurrentLocation();
//         console.log(
//           "🚀 ~ file: index.js ~ line 230 ~ returnnewPromise ~ location",
//           location
//         );
//         resolve(location);
//       }
//     }
//   });
// };

// export const enableLocation = async () => {
//   RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
//     interval: 10000,
//     fastInterval: 5000,
//   })
//     .then(async (data) => {
//       if (data === "enabled" || data === "already-enabled") {
//         const location = await returnCurrentLocation();
//         return location;
//       } else {
//         enableLocation();
//       }
//       // The user has accepted to enable the location services
//       // data can be :
//       //  - "already-enabled" if the location services has been already enabled
//       //  - "enabled" if user has clicked on OK button in the popup
//     })
//     .catch((err) => {
//       console.log("splash -> enableLocation -> err", err);
//       enableLocation();
//     });
// };

// export const returnCurrentLocation = async () => {
//   return new Promise(async (resolve) => {
//     Geolocation.getCurrentPosition(
//       (info) => {
//         console.log(
//           "🚀 ~ file: index.js ~ line 266 ~ returnCurrentLocation ~ info",
//           info
//         );
//         resolve({
//           latitude: info.coords.latitude,
//           longitude: info.coords.longitude,
//         });
//       },
//       (error) => console.log(error),
//       {
//         enableHighAccuracy: true,
//         maximumAge: 3600000,
//         timeout: 2000,
//       }
//     );
//   });
// };

export const logoutUser = () => {
  return new Promise((resolve) => {
    store.dispatch(logout());
    resolve();
  });
};
