import * as msal from "@azure/msal-browser";
import { msalConfig, loginRequest, tokenRequest } from './config/authConfig';
import { b2cPolicies } from './config/policies';
import { registerDefaults } from './api/baseApiClient';

const myMSALObj = new msal.PublicClientApplication(msalConfig);

let accountId = "";
let username = "";
let accessToken = null;

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


const setAccount = (account) => {
    accountId = account.homeAccountId;
    username = account.username;
    getTokenRedirect(tokenRequest);
}

const selectAccount = () => {
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

const handleResponse = async (response) => {
    if (response !== null) {
        setAccount(response.account);
    } else {
        selectAccount();
    }
}

export const signIn = () => {
    myMSALObj.loginRedirect(loginRequest);
}

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

const editProfile = () => {
    const editProfileRequest = b2cPolicies.authorities.editProfile;
    editProfileRequest.loginHint = myMSALObj.getAccountByHomeId(accountId).username;

    myMSALObj.loginRedirect(editProfileRequest);
}