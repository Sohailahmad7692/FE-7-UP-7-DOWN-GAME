import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
const Container = styled.div`
    margin-top: 20px;
    text-align: center;
`;

const Result = ({ diceResult }) => {
    return (
        <Container>
            <Typography variant="h5">
                🎲{diceResult.dice1} + 🎲{diceResult.dice2} = {diceResult.total}
            </Typography>
            <Typography
                variant="h6"
                style={{ marginTop: '20px', fontSize: '30px', color: diceResult.result > 0 ? 'green' : 'red', fontWeight: 'bold' }}
            >
                {diceResult.result > 0 ? `You won ${diceResult.result} points! 🎉` : 'You lost! 😔'}
            </Typography>
        </Container>

    );
};

export default Result;
