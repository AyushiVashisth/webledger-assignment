import React, { useContext, useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { AccountContext } from "../context/GoogleAccount";
import { backgroundImages } from "../utils/data";

const Login = () => {
  const { setGoogleAccount } = useContext(AccountContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [backgroundImages]);

  const onLoginSuccess = (res) => {
    try {
      const decoded = jwt_decode(res.credential);
      setGoogleAccount(decoded);
  
      // Save the user's authentication data and user ID in local storage.
      localStorage.setItem("userAuthData", JSON.stringify(decoded));
      localStorage.setItem("userId", decoded.sub);
    } catch (error) {
      console.error("Failed to decode JWT:", error);
    }
  };
  

  const onLoginError = (res) => {
    console.error("Login failed:", res);
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "background-image 1s ease-in-out"
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={backgroundImageStyle}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg text-center text-orange-900 border-orange-300 border-2 transform hover:scale-105 transition-transform duration-300 bg-opacity-10 backdrop-blur-xl">
        <h1 className="text-4xl font-extrabold mb-4 ">Recipe Hub</h1>
        <p className="text-lg font-semibold mb-6">
          Discover and share your favorite recipes.
        </p>
        <GoogleLogin
          className="bg-blue-500 hover:bg-blue-600 text-orange-900 px-6 py-3 rounded-lg text-lg cursor-pointer transition duration-300 transform"
          onSuccess={onLoginSuccess}
          onError={onLoginError}
        >
          Log in with Google
        </GoogleLogin>
      </div>
    </div>
  );
};

export default Login;
