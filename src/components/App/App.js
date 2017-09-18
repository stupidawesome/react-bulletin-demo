import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.css';
import Bulletin from "../Bulletin/Bulletin";
import {Route} from "react-router-dom";
import PostBuilder from "../PostBuilder/PostBuilder";

class App extends Component {
  render() {
    return (
      <div id="app" className="App">
        <main className="App-main">
          <img src={logo} className="App-logo" alt="logo" />
          <Route exact path="/" component={Bulletin}/>
          <Route exact path="/post/create" component={PostBuilder}/>
          <Route exact path="/post/edit/:postId" component={PostBuilder}/>
        </main>
      </div>
    );
  }
}

export default App;
