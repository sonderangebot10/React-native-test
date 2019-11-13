import React, { Component } from 'react';

import Login from './Login';
import Secured from './Main';

export default class LoginScreen extends Component {
  state = {
    isLoggedIn: false
  }

  render() {
    if (this.state.isLoggedIn) 
      return <Secured 
          onLogoutPress={() => this.setState({isLoggedIn: false})}
        />;
    else 
      return <Login 
          onLoginPress={() => this.setState({isLoggedIn: true})}
        />;
  }

}