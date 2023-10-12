import React, { useContext, useEffect } from "react";
import { AccountContext } from "./GoogleAccount";
import Home from "../pages/Home";
import Login from "../pages/Login";

const CheckAuth = () => {
  const { googleAccount, setGoogleAccount } = useContext(AccountContext);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      // If userId exists in local storage, set the user's authentication data.
      const userAuthData = JSON.parse(localStorage.getItem("userAuthData"));
      setGoogleAccount(userAuthData);
    }
  }, [setGoogleAccount, userId]);

  return (
    <div>
      {googleAccount ? (
        <div>
          <Home userId={userId} />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default CheckAuth;
