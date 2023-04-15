// src/HomePage.tsx
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'white',
          color: 'black',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Vacation House
          </Typography>
          <Button component={RouterLink} to="/" color="inherit" sx={{ textTransform: 'none' }}>
            Home
          </Button>
          <Button component={RouterLink} to="/pricing" color="inherit" sx={{ textTransform: 'none' }}>
            Pricing
          </Button>
          <Button component={RouterLink} to="/contact" color="inherit" sx={{ textTransform: 'none' }}>
            Contact
          </Button>
        </Toolbar>
      </AppBar>
      {/* Add your main content here */}
    </>
  );
}
