import React, { Component } from 'react';

import Navbar from '../navbar/navbar';
import TaskSection from '../task-section/taskSection';
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
        <TaskSection />
        <Footer />
      </div>
    )
  }
};

export default App;