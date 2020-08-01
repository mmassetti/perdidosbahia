import React from "react";

export default React.createContext({
  token: null,
  userId: null,
  firstName: null,
  hasPendingNotifications: null,
  login: (
    token,
    userId,
    tokenExpiration,
    firstName,
    hasPendingNotifications
  ) => {},
  logout: () => {},
});
