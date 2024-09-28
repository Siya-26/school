import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const postUser = async (name, email) => {
  const user = {
    name: name,
    email: email,
    liked_events: [],
    my_events: []
  }
  try {
    await axios.post(`${process.env.REACT_APP_API_URI}/api/users/create`, user, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then( response => {
      sessionStorage.setItem('user', response.data._id);
    });
  } catch (error) {
    console.log(error);
  }
}

const Login =  () => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    const handleLogin = async () => {
      if (isAuthenticated) {
        // Wait for postUser to finish before navigating
        await postUser(user.name, user.email);
        navigate('/home');
      }
    };
    handleLogin();
  }, [isAuthenticated, user, navigate]);
  return (
    <div>
      {/* <h2>Welcome! Please log in.</h2> */}
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
  
};

export default Login;