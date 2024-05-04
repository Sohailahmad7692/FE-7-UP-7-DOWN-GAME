import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateDiceResult, updatePoints } from '../action';
import Dice from './Dice';
import Result from './Result';

const BetButton = styled(Button)`
    margin: 10px;
    background-color: ${(props) => (props.selected ? '#007bff !important' : 'transparent !important')};
    color: ${(props) => (props.selected ? '#fff !important' : '#007bff !important')};
    border: 2px solid #007bff;
    border-radius: 5px;
    padding: 8px 16px;
    transition: all 0.3s ease;
    font-size: 18px !important;

    &:hover {
        background-color: #0056b3;
        color: white;
    }
`;
const SorryText = styled.div`
    margin-top: 100px;
    font-size: 26px;
    font-weight: 600;
    color: rgb(0, 123, 255);
    text-align: center;
`;
const Points = styled.span`
    font-weight: 600;
`;
const styles = {
    headingStyle: {
        marginBottom: '20px',
        color: '#007bff',
        paddingTop: '40px',
        fontSize: '30px',
        fontWeight: '600'
    },
    typographyStyle: {
        fontSize: "22px",
        fontWeight: '600',
    },
    pointsStyle: {
        marginTop: '60px',
        color: '#007bff',
        fontSize: '24px',
        textAlign: 'start',
    }
}

const Game = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [betAmount, setBetAmount] = useState(null);
    const [isRolling, setIsRolling] = useState(false);
    const dispatch = useDispatch();
    const points = useSelector((state) => state.game.points);
    const diceResult = useSelector((state) => state.game.diceResult);

    const handleRollDice = async () => {
        if (!selectedOption || !betAmount) {
            alert('Please select both an option and a bet amount.');
            return;
        }
        setIsRolling(true);

        try {
            // Simulate rolling animation
            await simulateDiceRoll();

            const response = await axios.post('https://be-7-up-7-down-game.onrender.com/roll-dice', {
                betAmount,
                selectedOption,
                points,
            });

            const { dice1, dice2, total, result, playerPoints } = response.data;
            setIsRolling(false);
            setSelectedOption('');
            setBetAmount(null);

            dispatch(updateDiceResult({ dice1, dice2, total, result }));
            dispatch(updatePoints(playerPoints));
        } catch (error) {
            console.error('Error rolling dice:', error);
            setIsRolling(false);
        }
    };

    const simulateDiceRoll = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000); // Wait for 2 seconds to simulate rolling effect
        });
    };

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        diceResult && dispatch(updateDiceResult({}));

    }

    const handleSelectBetOption = (betAmount) => {
        setBetAmount(betAmount)
        diceResult && dispatch(updateDiceResult({}));
    }

    return (
        <div>
            <Typography variant="h3" align="center" style={styles.headingStyle}>
                🎲 7 Up 7 Down Game 🎲
            </Typography>
            <Typography variant="h6" align="center" style={styles.pointsStyle}>
                Current Points:  <Points>{points}</Points>
            </Typography>

            {points > 0 ?
                <div>
                    {/* Betting options buttons */}
                    <div style={{ textAlign: 'center', marginTop: '60px' }}>
                        <Typography variant="subtitle1" style={styles.typographyStyle}>Select an option</Typography>
                        <div style={{ margin: '10px 0' }}>
                            <BetButton
                                variant="outlined"
                                onClick={() => handleSelectOption('7Down')}
                                selected={selectedOption === '7Down'}
                            >
                                7 Down
                            </BetButton>
                            <BetButton
                                variant="outlined"
                                onClick={() => handleSelectOption('Lucky7')}
                                selected={selectedOption === 'Lucky7'}
                            >
                                Lucky 7
                            </BetButton>
                            <BetButton
                                variant="outlined"
                                onClick={() => handleSelectOption('7Up')}
                                selected={selectedOption === '7Up'}
                            >
                                7 Up
                            </BetButton>
                        </div>
                    </div>

                    {/* Bet amount buttons */}
                    <div style={{ textAlign: 'center' }}>
                        <Typography variant="subtitle1" style={styles.typographyStyle}>Select a bet amount</Typography>
                        <div style={{ margin: '10px 0' }}>
                            <BetButton variant="outlined" onClick={() => handleSelectBetOption(100)} selected={betAmount === 100}>
                                Bet 100
                            </BetButton>
                            <BetButton variant="outlined" onClick={() => handleSelectBetOption(200)} selected={betAmount === 200}>
                                Bet 200
                            </BetButton>
                            <BetButton variant="outlined" onClick={() => handleSelectBetOption(500)} selected={betAmount === 500}>
                                Bet 500
                            </BetButton>
                        </div>
                    </div>

                    {/* Roll dice button - enabled only when option and amount are selected */}
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleRollDice}
                            disabled={!selectedOption || !betAmount || isRolling}
                        >
                            {isRolling ? 'Rolling...' : 'Roll Dice'}
                        </Button>
                    </div>

                    {/* Display rolling dice animation */}
                    {isRolling && (
                        <Dice />
                    )}
                    {/* Display dice result with animation */}
                    {diceResult.total !== undefined && (
                        <Result diceResult={diceResult} />
                    )}
                </div>
                : <SorryText>😔 Sorry You have exhausted all your points</SorryText>
            }
        </div>
    );
};

export default Game;
