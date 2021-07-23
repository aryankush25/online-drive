import React, { useCallback } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useLoginHook } from './hooks';
import loginImg from '../../assets/images/login.svg';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../utils/routesConstants';

import './styles.scss';
import { isPresent } from '../../utils/helper';

const LoginSignUp = () => {
  const match = useRouteMatch(REGISTER_ROUTE);
  const isRegisterPage = isPresent(match);

  const { email, password, name, setName, setEmail, setPassword, signInRequestHandler } = useLoginHook(isRegisterPage);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      signInRequestHandler();
    },
    [signInRequestHandler],
  );

  return (
    <div className="login-signup">
      <form className="container" onSubmit={handleSubmit}>
        <div className="base-container">
          <div className="header">{isRegisterPage ? 'Register' : 'Login'}</div>
          <div className="content">
            <div className="image">
              <img src={loginImg} alt="login-img" />
            </div>
            <div className="form">
              {isRegisterPage && (
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="name"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <button type="submit" className="btn">
            {isRegisterPage ? 'Register' : 'Login'}
          </button>
        </div>

        <div className="login-signup-footer">
          {isRegisterPage ? (
            <Link to={LOGIN_ROUTE}> Already a user? Login. </Link>
          ) : (
            <Link to={REGISTER_ROUTE}> New user? Register. </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginSignUp;
