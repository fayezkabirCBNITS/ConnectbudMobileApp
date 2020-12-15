import AsyncStorage from "@react-native-community/async-storage";
import { SMARTCART_API_BASE_URL } from "../../config";
import EndPoint from "../../config/EndPoint";
import { handleErrorIfAvailable } from "../error-handler";
import { getToken } from "../token-interceptors/index";
/**
 *
 *      General http methods
 *
 */
/**
 *
 * @param {object} params parameters
 */
const structureQueryParams = (params) => {
  let queryStrings = "?";
  const keys = Object.keys(params);
  keys.forEach((key, index) => {
    queryStrings += key + "=" + params[key];
    if (params[keys[index + 1]]) {
      queryStrings += "&";
    }
  });
  return queryStrings;
};

/**
 *
 * @param {string} url API url
 * @param {boolean} attachToken if token will be needed or not
 * @param {object} params parameters
 */
export const makeGetRequest = async (
  url,
  attachToken = false,
  params = null
) => {
  let queryString = "";

  if (params) {
    queryString = structureQueryParams(params);
  }
  console.log("url, attachToken, params :>> ", url, attachToken, params);
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  let isValid = false;
  if (attachToken) {
    try {
      console.log("🚀 ~ file: index.js ~ line 51 ~ queryString", queryString);
      const authToken = await getToken();
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {}
  }
  return new Promise((resolve, reject) => {
    try {
      let isValid = false;
      fetch(url + queryString, {
        method: "GET",
        headers: headers,
      })
        .then((res) => {
          if (res.ok) {
            isValid = true;
          }
          handleErrorIfAvailable(res);

          return res.json();
        })
        .then((jsonResponse) => {
          if (isValid) {
            resolve(jsonResponse);
          }
          reject(jsonResponse);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject();
    }
  });
};

/**
 *
 * @param {string} url API url
 * @param {boolean} attachToken if token will be needed or not
 * @param {object} params parameters
 */
export const makePostRequest = async (
  url,
  attachToken = false,
  params = {}
) => {
  console.log("POST url :>> ", url, params);
  let isValid = false;
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {
      console.log("e", e);
    }
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(params),
      })
        .then(
          async (res) => {
            console.log("res", res);

            if (res.ok) {
              if (res.url == SMARTCART_API_BASE_URL + EndPoint.users) {
                const locations = res.headers.map.location.split("/");
                const userId = locations[locations.length - 1];

                await AsyncStorage.setItem("userId", JSON.stringify(userId));
              }

              isValid = true;
            }
            handleErrorIfAvailable(res);

            return res.json();
          },
          (error) => {
            console.log("error 1", error);
            reject(error);
          }
        )
        .then(
          (jsonResponse) => {
            console.log("jsonResponse", jsonResponse, isValid);
            if (isValid) {
              resolve(jsonResponse);
            }
            reject(jsonResponse);
          },
          (error) => {
            console.log("error 2", error, isValid);
            reject(error);
          }
        )
        .catch((error) => {
          console.log("error 3", error);
          reject(error);
        });
    } catch (e) {
      console.log("e 4", e);
      reject(e);
    }
  });
};

/**
 *
 * @param {string} url API url
 * @param {boolean} attachToken if token will be needed or not
 * @param {object} params parameters
 */
export const makePutRequest = async (url, attachToken = false, params = {}) => {
  console.log("PUT -> url", url, params);

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let isValid = false;
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {}
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(params),
      })
        .then(
          (res) => {
            if (res.ok) {
              isValid = true;
            }
            handleErrorIfAvailable(res);
            return res.json();
          },
          (error) => {
            console.log("makePutRequest -> error", error);
            reject(error);
          }
        )
        .then(
          (jsonResponse) => {
            if (isValid) {
              resolve(jsonResponse);
            }
            reject(jsonResponse);
          },
          (error) => {
            reject(error);
          }
        )
        .catch((error) => {
          reject(error);
        });
    } catch (e) {
      reject();
    }
  });
};

/**
 *
 * @param {string} url API url
 * @param {boolean} attachToken if token will be needed or not
 * @param {object} params parameters
 */
export const makeDeleteRequest = async (
  url,
  attachToken = false,
  params = {}
) => {
  console.log("url :>> ", url);
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let isValid = false;
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {}
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(params),
        strictErrors: true,
      })
        .then(
          (res) => {
            if (res.ok) {
              isValid = true;
            }
            handleErrorIfAvailable(res);
            return res.json();
          },
          (error) => {
            reject(error);
          }
        )
        .then(
          (jsonResponse) => {
            if (isValid) {
              resolve(jsonResponse);
            }
            reject(jsonResponse);
          },
          (error) => {
            reject(error);
          }
        )
        .catch((error) => {
          reject(error);
        });
    } catch (e) {
      reject();
    }
  });
};
