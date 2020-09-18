import React, { Component } from 'react';

import Counter from './containers/Counter/Counter';
import Persons from './containers/Persons/Persons';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Counter />
      </div>
    );
  }
}

export default App;
