import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import loginContext from "./loginContext";
import './Navbar.css'

const NavBar = () => {
  const { user } = useContext(loginContext);
  console.log(user);
  return (
    <nav className="navbar">
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/companies">
        Companies
      </NavLink>
      <NavLink to="/jobs">
        Jobs
      </NavLink>
      <NavLink to="/login">
        Login
      </NavLink>
      <NavLink to="/signup">
        Signup
      </NavLink>
      <NavLink to="/profile">
        Profile
      </NavLink>
    </nav>
  );
}

export default NavBar;