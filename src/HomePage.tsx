import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import './assets/styles.css';

export default function HomePage() {
  return (
    <>
      <AppBar
        position="fixed"
        className="blurry-appbar"
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          zIndex: 1000,
          width: '100%',
        }}
      >
        <Box
          sx={{
            maxWidth: '33%',
            margin: '0 auto',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              width: '600px',
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              transform: 'translateX(-50%)',
            }}
          />
          <Toolbar disableGutters>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '600px', // Set fixed width for the content
                minHeight: '64px', // Set the minimum height to match the AppBar height
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  color: 'black',
                  marginLeft: '1rem', // Add some left margin for spacing
                }}
              >
                Vacation House
              </Typography>
              <Box>
                <Button
                  component={RouterLink}
                  to="/"
                  color="inherit"
                  sx={{ textTransform: 'none', color: 'black' }}
                >
                  Home
                </Button>
                <Button
                  component={RouterLink}
                  to="/pricing"
                  color="inherit"
                  sx={{ textTransform: 'none', color: 'black' }}
                >
                  Pricing
                </Button>
                <Button
                  component={RouterLink}
                  to="/contact"
                  color="inherit"
                  sx={{ textTransform: 'none', color: 'black' }}
                >
                  Contact
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      <Box
        className="home-background"
        sx={{
          paddingTop: '64px',
          minHeight: '100vh',
          backgroundSize: 'cover',
          position: 'fixed',
          width: '100%',
          zIndex: -1,
        }}
      />
      <Box
        className="home-content"
        sx={{
          backgroundColor: 'white',
          padding: '2rem',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
          top: '100%',
          paddingTop: 'calc(64px + 2rem)',
          paddingBottom: 'calc(64px + 2rem)',
        }}
      >
        <Typography variant="h2">Discover the Beauty of Norway</Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Norway, a beautiful and enchanting Nordic country, is famous for its breathtaking landscapes, mesmerizing fjords, and friendly locals. Known as the Land of the Midnight Sun, Norway offers a magical experience to travelers, with its picturesque countryside and vibrant cities.
        </Typography>
        {/* ... */}
      </Box>
      {/* Add your main content here */}
    </>
  );
}
