export const b2cPolicies = {
    names: {
        signUpSignIn: process.env.REACT_APP_B2C_POLICES_SISO,
        editProfile: process.env.REACT_APP_B2C_POLICES_EDIT_PROFILE,
        forgotPassword: process.env.REACT_APP_B2C_POLICES_FORGOT_PASS
    },
    authorities: {
        signUpSignIn: {
            authority: process.env.REACT_APP_B2C_POLICES_AUTH_SISO,
        },
        editProfile: {
            authority: process.env.REACT_APP_B2C_POLICES_AUTH_EDIT_PROFILE
        },
        forgotPassword: {
            authority: process.env.REACT_APP_B2C_POLICES_AUTH_FORGOT_PASS
        },
    },
    authorityDomain: process.env.REACT_APP_B2C_POLICES_AUTH_DOMAIN
}