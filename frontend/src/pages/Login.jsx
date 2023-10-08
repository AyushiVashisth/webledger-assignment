import React, { useContext, useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { AccountContext } from "../context/GoogleAccount";

const Login = () => {
  const { setgoogleAccount } = useContext(AccountContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    "https://www.hsph.harvard.edu/nutritionsource/wp-content/uploads/sites/30/2019/06/shutterstock_1384297349.jpg",
    "https://media.istockphoto.com/id/1338058296/photo/top-view-of-dietary-fiber-fresh-vegan-food-and-legumes-on-rustic-wooden-table-healthy-food.jpg?s=612x612&w=0&k=20&c=rtJVKQxf291CX_zsZk-8QlhU3lMnTCkUb1lgS6s5W58=",
    "https://assets.sweat.com/shopify_articles/images/000/002/225/original/Foods_High_In_Potassium344109d96f9c6730bef23498f7623724.jpg?1539758061",
    "https://domf5oio6qrcr.cloudfront.net/medialibrary/7501/hb-vitamins-1016207266145133.jpg",
    "https://previews.123rf.com/images/photka/photka1711/photka171100020/90788319-diverses-sources-de-nourriture-de-potassium-telles-que-des-grains-des-fruits-et-des-l%C3%A9gumes-vue-de-d.jpg"
  ];

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
      setgoogleAccount(decoded);
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
