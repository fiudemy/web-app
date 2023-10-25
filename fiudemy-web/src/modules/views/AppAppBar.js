import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import * as React from 'react';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';



export const AppAppBar=({ linkButtons }) => {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{flex:1, display : 'flex', alignItems : 'center'}}>
          </Box>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'FIUDEMY'}
          </Link>
          {< linkButtons />}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

