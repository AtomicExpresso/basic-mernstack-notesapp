import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../page/home.tsx";
import Login from "../../page/login.tsx";
import Signup from "../../page/signup.tsx";

export default function NavRoutes() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Home/>}
        />
        <Route
          path="/login"
          element={<Login/>}
        />
        <Route
          path="/signup"
          element={<Signup/>}
        />
      </Routes>
    </div>
  )
}