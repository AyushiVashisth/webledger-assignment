import React, { useContext } from "react";
import { AccountContext } from "./GoogleAccount";
import Home from "../pages/Home";
import Login from "../pages/Login";

const CheckAuth = () => {
  const { googleAccount } = useContext(AccountContext);

  const userId = googleAccount ? googleAccount.sub : null;

  localStorage.setItem("userId", userId);

  return <div>{googleAccount ? <Home userId={userId} /> : <Login />}</div>;
};

export default CheckAuth;
