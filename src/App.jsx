import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import PostInfo from "./pages/postInfo/PostInfo";
import AllPosts from "./pages/allPosts/AllPosts";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import CreatePost from "./pages/admin/createPost/CreatePost";
import Nopage from "./pages/nopage/Nopage";
import MyState from "./context/data/MyState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <MyState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postinfo/:id" element={<PostInfo />} />
          <Route path="/allposts" element={<AllPosts />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/createpost"
            element={
              <ProtectedRouteForAdmin>
                <CreatePost />
              </ProtectedRouteForAdmin>
            }
          />
          <Route path="/*" element={<Nopage />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </MyState>
  );
}

export default App;

export const ProtectedRouteForAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("admin"));
  if (user?.user?.email === "gujarathikrish@gmail.com") {
    return children;
  } else {
    return <Navigate to={"/adminlogin"} />;
  }
};
