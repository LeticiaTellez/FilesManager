import React, { useState, useEffect } from 'react';
import './App.css';
import { signIn, signOut, isLoggedIn, selectAccount } from '../../authRedirect';
import { getFiles } from '../../api/files/filesClient';
import Router from '../../Router';

function App() {
  useEffect(() => {

    setTimeout(() => {
      const loggedIn = isLoggedIn();
      console.log(loggedIn);
      loggedIn ? selectAccount() : signIn();
    }, 200);
  }, []);

  return (
    <Router />
  );
}

export default App;
