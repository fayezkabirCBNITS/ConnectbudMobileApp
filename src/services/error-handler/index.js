export const handleErrorIfAvailable = (httpResponse) => {
  switch (httpResponse.status) {
    case 401: {
      // Token expired
      //   logout();
    }
    case 403: {
      // Token expired
      // logout();
    }
    case 409: {
      // Token expired
      // logout();
    }
  }
};
