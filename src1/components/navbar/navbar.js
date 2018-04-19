import React, { Component } from 'react';

import './navbar.css'

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm justify-content-between navbar-section">
        <ul className="navbar-nav">
          <li className="nav-item logo">
            <a className="nav-link" href="/">SimpleTask</a>
          </li>
        </ul>
        <span className="nav-text">Hello, User!</span>
      </nav>
    );
  }
}

export default NavBar;