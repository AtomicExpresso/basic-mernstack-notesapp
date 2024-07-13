import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext.tsx";
import useLogout from "../../hooks/useLogout.tsx";

export default function Navbar(){
  const {user} = useAuthContext()
  const {logout} = useLogout()
  
  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>MERN Notes</h1>
      </div>
      <div className="navbar-buttons">
        {user ?
          <div className="navbar-user">
            <h2>{user.username}</h2>
            <button className="btn btn-light" onClick={() => logout()}>Log out</button>
          </div>
        :
          <div>
            <Link to="/login">
              <button className="btn btn-light">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-light">Signup</button>
            </Link>
          </div>
        }
      </div>
    </div>
  )
}