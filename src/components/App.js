import React, { Component } from 'react';
import logo from '../logo.svg';

import '../App.css';
import Search from '../containers/Search';

class App extends Component {
  render() {
    return (
        <div className="App">
            <h1> Audio Player App</h1>
            {this.props.children}
        </div>
    );
  }
}

export default App;
