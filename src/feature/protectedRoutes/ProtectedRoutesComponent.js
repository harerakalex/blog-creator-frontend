/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* istanbul ignore file */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const ProtectedRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (rest.isAuthenticated ? <Component {...props} /> : (
      <Redirect to={`/login?redirectTo=${props.location.pathname}`} />
    ))}
  />
);

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated
});

export default connect(mapStateToProps)(ProtectedRoutes);
