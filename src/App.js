import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Content } from './components/Content';
import { Header } from './components/Header';
import NavBar from './components/Navbar';

function App() {
  return (
    <Router>
      <Header />
      <NavBar />
      <Footer />
    </Router>
  );
}

export default App;
