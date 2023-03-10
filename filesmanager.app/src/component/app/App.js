import React, { useEffect } from 'react';
import { signIn, isLoggedIn, selectAccount } from '../../authRedirect';
import Router from '../../Router';

function App() {
  useEffect(() => {
    
    setTimeout(() => {
      const loggedIn = isLoggedIn();
      loggedIn ? selectAccount() : signIn();
    }, 200);
  }, []);

  return (
    <Router />
  );
}

export default App;
