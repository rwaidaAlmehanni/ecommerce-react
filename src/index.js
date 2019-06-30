import React, {Component} from 'react';
import {render} from 'react-dom';
import Main from "./components/Main";
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    );
  }
}

render(<App/>, document.getElementById('root'));
