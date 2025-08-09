import { Navigate, Route, Routes } from "react-router";
import React from "react";
import FriendsPage from "./pages/FriendsPage";


import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import Profilepage  from "./pages/Profilepage.jsx";
import { Toaster } from "react-hot-toast";

import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import './App.css'; //imort global styles
import Layout from "./components/Layout.jsx";
// import { useThemeStore } from "./store/useThemeStore.js";
import { useThemeStore } from "./store/useThemeStore";
import {THEMES} from "./constants/index.js";
import Alert from "./components/Alert.jsx"
import { useState } from "react";
//when we want to delete or create something(post,put,delete) we have to use mutation fxn and when we use get request we have to use useQuery fxn
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles

const App = () => {
  
const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };


  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();
  console.log("Current theme:", theme);

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  // This applies the theme class to <body>
// useEffect(() => {
//   document.body.className = ''; // clear old theme
//   document.body.classList.add(`theme-${theme}`);//apply new theme
// }, [theme]);
//instead of fetch use axios fetch <==> axios.get
const currentThemeObj = THEMES.find((t) => t.name === theme);
const themeClass = currentThemeObj?.bootstrapClass || "bg-light text-dark";
  if (isLoading)
    return (
      // <div className="d-flex justify-content-center align-items-center vh-100 bg-light" data-theme={theme}>
       <div className={`d-flex justify-content-center align-items-center vh-100 ${themeClass}`}>
        <PageLoader />
      </div>
    );
 
  return (
    // <div className="min-vh-100 " data-theme={theme}>
    <div className={`min-vh-100 ${themeClass}`}>

    

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage showAlert={showAlert}/>
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/register"
          element={
            !isAuthenticated ? <SignUpPage showAlert={showAlert}/> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />

        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage showAlert={showAlert}/> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />

        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage showAlert={showAlert} />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />


           <Route
          path="/profilepage"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Profilepage showAlert={showAlert} />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage showAlert={showAlert}/>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

{/* LoginPage.jsx & SignUpPage.jsx me navigate() use kar ke redirect after login.
App.jsx ke route guards use kar ke unauthorized access roko */}


        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <ChatPage showAlert={showAlert}/>
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? <OnboardingPage showAlert={showAlert}/> : <Navigate to="/" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
  path="/friends"
  element={
    isAuthenticated && isOnboarded ? (
      <Layout showSidebar={true}>
        <FriendsPage showAlert={showAlert} />
      </Layout>
    ) : (
      <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
    )
  }
/>

      </Routes>
  <Alert alert={alert}/>
      <Toaster />
    </div>
  );
};

export default App;




