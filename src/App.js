import React, { Component } from 'react';
import ChatScreen from './pages/ChatView';
import Login from './pages/Login';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUsername: null,
      isLoading: false,
      isDone: true,
      currentScreen: 'WhatIsYourUsernameScreen'
    }
  }

  componentDidMount(){
    // console.log('inicialmente', this.props);
  }

  render() {
    const { isAuthenticated, isVerifying, user } = this.props;
    if(isVerifying) { 
      return (
      <div style={{ display: 'flex',
                    height: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
        <CircularProgress disableShrink />
      </div>
      ) 
    };
    return (
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={ChatScreen}
          props={{ currentUsername: user.email !== undefined && user.email.substring(0, user.email.indexOf("@")) }}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
        />
        <Route path="/login" component={Login} />
      </Switch>
    );
  }
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(App);
