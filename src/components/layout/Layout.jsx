import React from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="content min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
