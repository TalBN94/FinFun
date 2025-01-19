import React, { useState, useEffect } from "react";
import SplashScreen from "../Pages/LogoScreen";

const AppWrapper = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }
  return children;
};

export default AppWrapper;