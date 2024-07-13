import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../page/home.tsx";
import Login from "../../page/login.tsx";
import Signup from "../../page/signup.tsx";
import useAuthContext from "../../hooks/useAuthContext.tsx";

export default function NavRoutes() {
  const {user} = useAuthContext();
  
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={user ? <Home/> : <Navigate to="/login"/>}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/"/> : <Login/>}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/"/> : <Signup/>}
        />
      </Routes>
    </div>
  )
}