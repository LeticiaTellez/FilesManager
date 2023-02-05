import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import { signIn, signOut, editProfile } from '../../authRedirect';

function PricingContent() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Files Manager
          </Typography>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={editProfile}>
            Edit Profile
          </Button>
          <Button href="#" variant="outlined" color="error" sx={{ my: 1, mx: 1.5 }} onClick={signOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      {/* End hero unit */}

    </React.Fragment>
  );
}

export default function Header() {
  return <PricingContent />;
}