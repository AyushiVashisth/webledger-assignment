import React from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleAccount from "../context/GoogleAccount";
import CheckAuth from "../context/checkAuth";

const AllRoutes = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleAccount>
                <CheckAuth />
              </GoogleAccount>
            </GoogleOAuthProvider>
          }
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
