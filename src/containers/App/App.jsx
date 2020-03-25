import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Reg from '../Reg/Reg';
import Auth from '../Auth/Auth';
import HomePage from '../../components/HomePage/HomePage';
import Profile from '../../components/Profile/Profile';
import { authUser, authMailVal, authFormControl } from '../../actions/actions';

import './_App.scss';

const App = (props) => {
  const prop = props;

  const userAuthFlag = JSON.parse(localStorage.getItem('userAuthFlag'));

  const handleClickSignOut = () => {
    localStorage.removeItem('authUserData');
    prop.userOut(false, prop.initAuthFormControls.email);
  };

  return (
    <div className="container">
      <header className="header">
        {userAuthFlag === null && (
        <Link to="/registration" className="btn btn-primary header__btn">
          Sign Up
        </Link>
        )}
        {userAuthFlag === null && (
        <Link to="/auth" className="btn btn-primary header__btn">
          Sign in
        </Link>
        )}
        {userAuthFlag === false && (
        <Link to="/registration" className="btn btn-primary header__btn">
          Sign Up
        </Link>
        )}
        {userAuthFlag === false && (
        <Link to="/auth" className="btn btn-primary header__btn">
          Sign in
        </Link>
        )}
        {userAuthFlag && (
        <Link to="/profile" className="btn btn-primary header__btn">
          Profile
        </Link>
        )}
        {userAuthFlag && (
        <Link to="/registration" className="btn btn-primary header__btn" onClick={handleClickSignOut}>
          Sign out
        </Link>
        )}
      </header>
      <div className="content">
        <Switch>
          <Route exact path="/registration">
            <Reg />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/homepage">
            <HomePage />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </div>
  );
};


const mapStateToProps = (store) => ({
  authUserFlag: store.userAuthFlag,
  initAuthFormControls: store.initFormControls.authFormControls,
});

const mapDispathToProps = (dispatch) => ({
  userOut(bool, obj) {
    dispatch(authUser(bool));
    dispatch(authMailVal(''));
    dispatch(authFormControl(obj));
    const userAuthFlagJSON = JSON.stringify(bool);
    localStorage.setItem('userAuthFlag', userAuthFlagJSON);
  },
});

export default connect(mapStateToProps, mapDispathToProps)(App);
