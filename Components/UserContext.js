import React, { createContext, useContext } from "react";

const LoginUserIdContext = createContext("");

export const LoginUserIdProvider = ({ userId, children }) => {
  return (
    <LoginUserIdContext.Provider value={userId}>
      {children}
    </LoginUserIdContext.Provider>
  );
};

export const useLoginUserId = () => {
  return useContext(LoginUserIdContext);
};
