import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import './assets/styles.css';

export default function HomePage() {
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'transparent',
          color: 'black',
          boxShadow: 'none',
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
      <div className="home-background" style={{ paddingTop: '64px' }}></div>
      {/* Add your main content here */}
    </>
  );
}
