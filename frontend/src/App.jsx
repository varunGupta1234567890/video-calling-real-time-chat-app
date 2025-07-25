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
import {useEffect} from "react";
import { Toaster } from "react-hot-toast";

import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import './App.css'; //imort global styles
import Layout from "./components/Layout.jsx";
// import { useThemeStore } from "./store/useThemeStore.js";
import { useThemeStore } from "./store/useThemeStore";
import {THEMES} from "./constants/index.js";


import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles

const App = () => {
  
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
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/register"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />

        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />

        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
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
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
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
              !isOnboarded ? <OnboardingPage /> : <Navigate to="/" />
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
        <FriendsPage />
      </Layout>
    ) : (
      <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
    )
  }
/>

      </Routes>

      <Toaster />
    </div>
  );
};

export default App;




