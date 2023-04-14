// src/HomePage.tsx
import React from 'react';
import { Container, AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
// import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// import { Switch } from 'react-router';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import PricingIcon from '@mui/icons-material/AttachMoneyOutlined';
import ContactIcon from '@mui/icons-material/MailOutlined';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

const HomePage: React.FC = () => {
  return (
    <Router>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Vacation House
            </Typography>
            <Button color="inherit" startIcon={<PricingIcon />} component={Link} to="/pricing">
              Pricing
            </Button>
            <Button color="inherit" startIcon={<ContactIcon />} component={Link} to="/contact">
              Contact
            </Button>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/pricing">
            <Pricing />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default HomePage;
