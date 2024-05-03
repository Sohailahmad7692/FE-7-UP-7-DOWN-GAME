import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Typography } from '@mui/material';

const rollAnimation = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;
const RollingDice = styled.div`
    display: inline-block;
    font-size: 30px;
    animation: ${rollAnimation} 2s linear infinite;
`;
const Container = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dice = () => {
  return (
    <Container>
      <RollingDice>🎲</RollingDice>
      <Typography variant="h4" style={{ margin: '0 10px', fontSize: '30px' }}>
        +
      </Typography>
      <RollingDice>🎲</RollingDice>
    </Container>
  );
};

export default Dice;
