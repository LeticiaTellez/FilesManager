import * as msal from "@azure/msal-browser";
import { msalConfig, loginRequest, tokenRequest } from './config/authConfig';
import { b2cPolicies } from './config/policies';
import { registerDefaults } from './api/baseApiClient';

const myMSALObj = new msal.PublicClientApplication(msalConfig);

let accountId = "";
let username = "";
let accessToken = null;

export const signIn = () => {
  myMSALObj.loginRedirect(loginRequest);
}

myMSALObj.handleRedirectPromise()
  .then(response => {
    if (response) {
      if (response.idTokenClaims['tfp'].toUpperCase() === b2cPolicies.names.signUpSignIn.toUpperCase()) {
        handleResponse(response);
      }
    }
  })
  .catch(error => {
    console.log(error);
  });

const handleResponse = async (response) => {
  if (response !== null) {
    setAccount(response.account);
  } else {
    selectAccount();
  }
}

const setAccount = (account) => {
  accountId = account.homeAccountId;
  username = account.username;
  getTokenRedirect(tokenRequest);
}

export const selectAccount = () => {
  const currentAccounts = myMSALObj.getAllAccounts();

  if (currentAccounts.length < 1) {
    return;
  } else if (currentAccounts.length > 1) {

    const accounts = currentAccounts.filter(account =>
      account.homeAccountId.toUpperCase().includes(b2cPolicies.names.signUpSignIn.toUpperCase())
      &&
      account.idTokenClaims.iss.toUpperCase().includes(b2cPolicies.authorityDomain.toUpperCase())
      &&
      account.idTokenClaims.aud === msalConfig.auth.clientId
    );

    if (accounts.length > 1) {
      // localAccountId identifies the entity for which the token asserts information.
      if (accounts.every(account => account.localAccountId === accounts[0].localAccountId)) {
        // All accounts belong to the same user
        setAccount(accounts[0]);
      } else {
        // Multiple users detected. Logout all to be safe.
        signOut();
      };
    } else if (accounts.length === 1) {
      setAccount(accounts[0]);
    }

  } else if (currentAccounts.length === 1) {
    setAccount(currentAccounts[0]);
  }
}

// in case of page refresh
//selectAccount();
export const signOut = () => {
  const logoutRequest = {
    postLogoutRedirectUri: msalConfig.auth.redirectUri,
  };

  myMSALObj.logoutRedirect(logoutRequest);
}

const getTokenRedirect = (request) => {
  request.account = myMSALObj.getAccountByHomeId(accountId);

  return myMSALObj.acquireTokenSilent(request)
    .then((response) => {
      if (!response.accessToken || response.accessToken === "") {
        throw new msal.InteractionRequiredAuthError;
      } else {
        console.log("access_token acquired at: " + new Date().toString());
        accessToken = response.accessToken;
        registerDefaults(accessToken);
      }
    }).catch(error => {
      console.log("Silent token acquisition fails. Acquiring token using popup. \n", error);
      if (error instanceof msal.InteractionRequiredAuthError) {
        return myMSALObj.acquireTokenRedirect(request);
      } else {
        console.log(error);
      }
    });
}

export const editProfile = () => {
  const editProfileRequest = b2cPolicies.authorities.editProfile;
  editProfileRequest.loginHint = myMSALObj.getAccountByHomeId(accountId).username;

  myMSALObj.loginRedirect(editProfileRequest);
}

export const isLoggedIn = () => {
  try {
    const currentAccounts = myMSALObj.getAllAccounts();
    const hasAccount = currentAccounts && currentAccounts.length > 0;
    return hasAccount;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getUserId = () => {
  let userId = "";
  try {
    const currentAccounts = myMSALObj.getAllAccounts();

    if (currentAccounts.length > 0) {
      userId = currentAccounts[0].localAccountId;
      console.log(userId);
    }

    return userId;
  } catch (error) {
    console.log(error);
    return userId;
  }
}