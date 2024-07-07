import React from "react";
import {Route, Link} from "react-router-dom"

export default function Navbar(){
  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>MERN Notes</h1>
      </div>
      <div className="navbar-buttons">
        <button className="btn btn-light">Login</button>
      </div>
    </div>
  )
}