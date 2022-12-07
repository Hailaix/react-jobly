import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import loginContext from "./loginContext";
import './Navbar.css'

const NavBar = ({ logout }) => {
  const { user } = useContext(loginContext);
  return (
    <nav className="navbar">
      <NavLink className='navHome' to="/">
        Home
      </NavLink>
      <div className="nav-right">
        {user
          ? <>
            <NavLink to="/companies">
              Companies
            </NavLink>
            <NavLink to="/jobs">
              Jobs
            </NavLink>
            <NavLink to="/profile">
              {user.username}
            </NavLink>
            <button onClick={logout}>Log Out</button>
          </>
          : <>
            <NavLink to="/login">
              Login
            </NavLink>
            <NavLink to="/signup">
              Signup
            </NavLink>
          </>
        }
      </div>


    </nav>
  );
}

export default NavBar;