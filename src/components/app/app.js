import React, { Component } from 'react';

import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

import './app.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="app-wrapper">
        <Navbar />
        <div className="container">
          <h1>Your Tasks</h1>
        </div>
        <Footer />
      </div>
    )
  }
};

export default App;