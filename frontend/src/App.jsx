import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const homapagePath = location.pathname == "/";
  return (
    <>
      {!homapagePath && <Navbar />}
      <Outlet />
      {!homapagePath && <Footer />}
    </>
  );
};

export default App;
