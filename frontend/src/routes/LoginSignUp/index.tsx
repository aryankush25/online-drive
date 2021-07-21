import React, { useCallback } from 'react';
import { useLoginHook } from './hooks';
import loginImg from '../../assets/images/login.svg';

import './styles.scss';

const LoginSignUp = () => {
  const { email, password, setEmail, setPassword, signInRequestHandler } = useLoginHook();

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
          <div className="header">Login</div>
          <div className="content">
            <div className="image">
              <img src={loginImg} alt="login-img" />
            </div>
            <div className="form">
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
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginSignUp;
