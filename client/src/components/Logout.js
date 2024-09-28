import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    logout({ logoutParams: { returnTo: process.env.CLIENT } });
  }, [logout]);
  return <div>Logging out...</div>;
};

export default Logout;
