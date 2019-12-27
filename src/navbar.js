import React, { Component } from 'react';

import './Navbar.css';


class Navbar extends Component {
  render() {
    return (
      <div class="topnav">
          <a>DM Screen</a>
          <a>Battle Map</a>
          <a>Player Screen</a>
      </div>
    );
  }
}


export default Navbar