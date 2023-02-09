
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import React, { Component } from 'react';
import Chat from "./scenes/chat/Chat";
import AdminLogin from "./scenes/adminLogin/AdminLogin";
import AdminHome from "./scenes/adminHome/AdminHome";
import ProtectedRoute from "./components/Admin/AdminProtectedRoute";

import AdminPostReport from "./scenes/adminReport/AdminPostReport";
import OtpFormm from "./scenes/loginPage/OtpFormm";
import AdminDashBoard from "./scenes/adminDashBoard/AdminDashBoard";
import Notifications from "./components/Admin/Notifications";
import { Toaster } from "react-hot-toast";





function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  console.log(isAuth, 'enthannnuuu');
  return (
    <div className="app">
      <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isAuth ? <HomePage /> : <LoginPage />} />
            <Route path="/otp-page" element={<OtpFormm />} />

            <Route
              path="/*"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />

            <Route
              path="/chat"
              element={isAuth ? <Chat /> : <Navigate to="/" />}
            />
            <Route
              path="/admin"
              element={<AdminLogin />}
            />
            <Route
              path="/admin-home"
              element={<ProtectedRoute><AdminHome /></ProtectedRoute>}
            />
            <Route
              path="/admin-post-report"
              element={<ProtectedRoute><AdminPostReport /></ProtectedRoute>}
            />
            <Route
              path="/admin-dashboard"
              element={<ProtectedRoute><AdminDashBoard/></ProtectedRoute>}
            />
            <Route
              path="/admin-notifications"
              element={<ProtectedRoute><Notifications/> </ProtectedRoute>}
            />
         


          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
