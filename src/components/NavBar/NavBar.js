import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.png'

import './NavBar.css';

class NavBar extends React.Component {
  render() {
    return(
      <div className="header">
        <div className="logo">
          <NavLink to='/'><img src={logo} alt="Kzarka" className="logo-img"></img></NavLink>
          <NavLink to='/' className="logo-text">Kzarka</NavLink>
        </div>
        <ul className="navbar">
          <li>
            <NavLink to='/imperialcooking' className="navbar-link" activeClassName="navbar-active">Imperial Cooking</NavLink>
          </li>
          {/* <li>
            <NavLink to="/marketplace" className="navbar-link" activeClassName="navbar-active">Marketplace</NavLink>
          </li> */}
        </ul>
      </div>
    )
  }
}

export default NavBar;