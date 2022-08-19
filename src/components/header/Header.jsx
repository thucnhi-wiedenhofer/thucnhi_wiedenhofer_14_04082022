import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../pictures/logo.jpg';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Wealth Health logo"></img>
        </NavLink>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                className={(nav) =>
                  nav.isActive ? 'nav-item active' : 'nav-item'
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(nav) =>
                  nav.isActive ? 'nav-item active' : 'nav-item'
                }
                to="/employee-list"
              >
                View Current Employees
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;