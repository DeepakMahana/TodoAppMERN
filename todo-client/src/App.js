import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import './App.css';
import { createBrowserHistory } from 'history';

function App() {

  const history = createBrowserHistory();

  return (
    <Router history={history}>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
    </div>
  </Router>
  );
}

export default App;
