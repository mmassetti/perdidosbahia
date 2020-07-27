import React from "react";

export default React.createContext({
  token: null,
  userId: null,
  firstName: null,
  login: (token, userId, tokenExpiration, firstName) => {},
  logout: () => {},
});
