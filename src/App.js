import React from 'react';
import { Container } from '@mui/material';
import Game from './components/Game';

function App() {
  return (
    <Container maxWidth="sm" style={{ backgroundColor: '#A4DFF0', height: "100vh" }}>
      <Game />
    </Container>
  );
}

export default App;
