import React, { Component } from 'react';

import './App.css';
import Navbar from './navbar'

class App extends Component {
  componentDidMount(){
    document.title = "DM Master"
  }
  render() {
    return (
      <Navbar />
    );
  }
}

export default App;
