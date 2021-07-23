import React from 'react';
import { Redirect } from 'react-router-dom';
import { isTokensPresentLocalStorage } from '../utils/tokensHelper';
import { REGISTER_ROUTE } from '../utils/routesConstants';

const Landing = () => {
  if (isTokensPresentLocalStorage()) {
    return <Redirect to={'/drive/root'} />;
  }

  return <Redirect to={REGISTER_ROUTE} />;
};

export default Landing;
