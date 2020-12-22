import AsyncStorage from "@react-native-community/async-storage";
import { CONNECTBUD_API_BASE_URL } from "../../config/url";
//import EndPoint from "../../config/EndPoint";
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
  console.log("url, attachToken, params :>> ", CONNECTBUD_API_BASE_URL+url, attachToken, params);
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
      fetch(CONNECTBUD_API_BASE_URL+url + queryString, {
        method: "GET",
        headers: headers,
      })
      .then(
        async (res) => {
          console.log('res---', res);
          handleErrorIfAvailable(res);
          return await res.json();
        },
        (error) => {
          reject(error);
        },
      )
      .then(
        (jsonResponse) => {
          resolve(jsonResponse);
        },
        (error) => {
          console.log('error', error);
          reject(error);
        },
      )
      .catch((error) => {
        console.log('error', error);
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

export const makePostRequest = async (
  url,
  attachToken = false,
  params = {},
) => {
  console.log('POST url :>> ', CONNECTBUD_API_BASE_URL+url, params);
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers['Authorization'] = 'Bearer ' + authToken;
      }
    } catch (e) {
      console.log('e', e);
    }
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(CONNECTBUD_API_BASE_URL+url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params),
        //body:params,
      })
        .then(
          async (res) => {
            console.log('res---', res);
            handleErrorIfAvailable(res);
            return await res.json();
          },
          (error) => {
            reject(error);
          },
        )
        .then(
          (jsonResponse) => {
            resolve(jsonResponse);
          },
          (error) => {
            console.log('error', error);
            reject(error);
          },
        )
        .catch((error) => {
          console.log('error', error);
          reject(error);
        });
    } catch (e) {
      reject();
    }
  });
};

export const makePostRequestMultipart = async (
  url,
  attachToken = false,
  params = {},
) => {
  console.log('POST url :>> ', url, params);
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers['Authorization'] = 'Bearer ' + authToken;
      }
    } catch (e) {
      console.log('e', e);
    }
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(CONNECTBUD_API_BASE_URL+url, {
        method: 'POST',
        headers: headers,
        body: params,
        //body: JSON.stringify(params),

      })
        .then(
          async (res) => {
            console.log('res---', res);
            handleErrorIfAvailable(res);
            return await res.json();
          },
          (error) => {
            reject(error);
          },
        )
        .then(
          (jsonResponse) => {
            resolve(jsonResponse);
          },
          (error) => {
            console.log('error', error);
            reject(error);
          },
        )
        .catch((error) => {
          console.log('error', error);
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
      fetch(CONNECTBUD_API_BASE_URL+url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(params),
      })
      .then(
        async (res) => {
          console.log('res---', res);
          handleErrorIfAvailable(res);
          return await res.json();
        },
        (error) => {
          reject(error);
        },
      )
      .then(
        (jsonResponse) => {
          resolve(jsonResponse);
        },
        (error) => {
          console.log('error', error);
          reject(error);
        },
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
      fetch(CONNECTBUD_API_BASE_URL+url, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(params),
        strictErrors: true,
      })
      .then(
        async (res) => {
          console.log('res---', res);
          handleErrorIfAvailable(res);
          return await res.json();
        },
        (error) => {
          reject(error);
        },
      )
      .then(
        (jsonResponse) => {
          resolve(jsonResponse);
        },
        (error) => {
          console.log('error', error);
          reject(error);
        },
      )
        .catch((error) => {
          reject(error);
        });
    } catch (e) {
      reject();
    }
  });
};
