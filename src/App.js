import React, { Component } from 'react';
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import { addListener, removeListener, isAuthorized } from './AuthorizeApi';
import Home from './Home';
import Public from './Public';
import Private from './Private';
import Auth from './Auth';

class App extends Component {
  state = {
    isAuthorized
  };

  componentDidMount() {
    addListener(this.handleAuthorize);
  }

  componentWillUnmount() {
    removeListener(this.handleAuthorize);
  }

  handleAuthorize = isAuthorized => {
    this.setState({ isAuthorized });
  };

  render() {
    const { isAuthorized } = this.state;

    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/public">Public</Link>
          </li>
          <li>
            <Link to="/private">Private</Link>
          </li>
          <li>
            <Link to="/auth">Authorization</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/public" component={Public} />
          {isAuthorized === true ? (
            <Route path="/private" component={Private} />
          ) : (
            <Redirect from="/private" to="/auth" />
          )}
          <Route path="/auth" component={Auth} />
          {isAuthorized === false ? <Route component={Home} /> : null}


        </Switch>
      </div>
    );
  }
}

export default App;
