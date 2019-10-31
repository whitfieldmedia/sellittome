import React from 'react';
import Home from './Home';
import Nav from './Nav';
import Offer from './Offer';
import Database from './Database';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { connect } from 'react-redux';
import { verify } from './redux/auth';
import Login from './Login';
import SignUp from './SignUp';
import './assets/css/app.css';

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/get-offer" component={Offer} />
          <Route path="/login" render={ props => isAuthenticated ? 
            <Redirect to="/vehicle-database" />
            : 
            <Login {...props} />
          } />
          <Route path="/signup" render={ props => isAuthenticated ? 
            <Redirect to="/vehicle-database" />
            :
            <SignUp {...props} />
          } />
          <ProtectedRoute path="/vehicle-database" component={Database} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(state => state, {verify})(App));